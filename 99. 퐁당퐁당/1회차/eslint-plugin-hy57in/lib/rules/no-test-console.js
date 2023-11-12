/**
 * @fileoverview Rule to flag use of console object
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------



/**
 * Gets the property name of a given node.
 * The node can be a MemberExpression, a Property, or a MethodDefinition.
 *
 * If the name is dynamic, this returns `null`.
 *
 * For examples:
 *
 *     a.b           // => "b"
 *     a["b"]        // => "b"
 *     a['b']        // => "b"
 *     a[`b`]        // => "b"
 *     a[100]        // => "100"
 *     a[b]          // => null
 *     a["a" + "b"]  // => null
 *     a[tag`b`]     // => null
 *     a[`${b}`]     // => null
 *
 *     let a = {b: 1}            // => "b"
 *     let a = {["b"]: 1}        // => "b"
 *     let a = {['b']: 1}        // => "b"
 *     let a = {[`b`]: 1}        // => "b"
 *     let a = {[100]: 1}        // => "100"
 *     let a = {[b]: 1}          // => null
 *     let a = {["a" + "b"]: 1}  // => null
 *     let a = {[tag`b`]: 1}     // => null
 *     let a = {[`${b}`]: 1}     // => null
 * @param {ASTNode} node The node to get.
 * @returns {string|null} The property name if static. Otherwise, null.
 */
function getStaticPropertyName(node) {
    let prop;

    switch (node && node.type) {
        case "ChainExpression":
            return getStaticPropertyName(node.expression);

        case "Property":
        case "PropertyDefinition":
        case "MethodDefinition":
            prop = node.key;
            break;

        case "MemberExpression":
            prop = node.property;
            break;

        // no default
    }

    if (prop) {
        if (prop.type === "Identifier" && !node.computed) {
            return prop.name;
        }

        return getStaticStringValue(prop);
    }

    return null;
}

/**
 * Finds the variable by a given name in a given scope and its upper scopes.
 * @param {eslint-scope.Scope} initScope A scope to start find.
 * @param {string} name A variable name to find.
 * @returns {eslint-scope.Variable|null} A found variable or `null`.
 */
function getVariableByName(initScope, name) {
    let scope = initScope;

    while (scope) {
        const variable = scope.set.get(name);

        if (variable) {
            return variable;
        }

        scope = scope.upper;
    }

    return null;
}

/**
 * Returns the result of the string conversion applied to the evaluated value of the given expression node,
 * if it can be determined statically.
 *
 * This function returns a `string` value for all `Literal` nodes and simple `TemplateLiteral` nodes only.
 * In all other cases, this function returns `null`.
 * @param {ASTNode} node Expression node.
 * @returns {string|null} String value if it can be determined. Otherwise, `null`.
 */
function getStaticStringValue(node) {
    switch (node.type) {
        case "Literal":
            if (node.value === null) {
                if (isNullLiteral(node)) {
                    return String(node.value); // "null"
                }
                if (node.regex) {
                    return `/${node.regex.pattern}/${node.regex.flags}`;
                }
                if (node.bigint) {
                    return node.bigint;
                }

                // Otherwise, this is an unknown literal. The function will return null.

            } else {
                return String(node.value);
            }
            break;
        case "TemplateLiteral":
            if (node.expressions.length === 0 && node.quasis.length === 1) {
                return node.quasis[0].value.cooked;
            }
            break;

        // no default
    }

    return null;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('../shared/types').Rule} */
module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "Disallow the use of `console`",
            recommended: false,
            url: "https://eslint.org/docs/latest/rules/no-console"
        },

        schema: [
            {
                type: "object",
                properties: {
                    allow: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        minItems: 1,
                        uniqueItems: true
                    }
                },
                additionalProperties: false
            }
        ],

        messages: {
            unexpected: "Unexpected console statement."
        }
    },

    create(context) {
        const options = context.options[0] || {};
        const allowed = options.allow || [];
        // const prefix = options.prefix || [];
        const sourceCode = context.sourceCode;

        /**
         * Checks whether the given reference is 'console' or not.
         * @param {eslint-scope.Reference} reference The reference to check.
         * @returns {boolean} `true` if the reference is 'console'.
         */
        function isConsole(reference) {
            const id = reference.identifier;

            return id && id.name === "console";
        }

        /**
         * Checks whether the property name of the given MemberExpression node
         * is allowed by options or not.
         * @param {ASTNode} node The MemberExpression node to check.
         * @returns {boolean} `true` if the property name of the node is allowed.
         */
        function isAllowed(node) {
            const propertyName = getStaticPropertyName(node);
            // const message = node.parent.arguments[0].name;
            //
            // if(!(propertyName && allowed.includes(propertyName))) {
            //     return false;
            // }

            //return message.startsWith(prefix)

            return propertyName && allowed.includes(propertyName)

        }

        /**
         * Checks whether the given reference is a member access which is not
         * allowed by options or not.
         * @param {eslint-scope.Reference} reference The reference to check.
         * @returns {boolean} `true` if the reference is a member access which
         *      is not allowed by options.
         */
        function isMemberAccessExceptAllowed(reference) {
            const node = reference.identifier;
            const parent = node.parent;

            return (
                parent.type === "MemberExpression" &&
                parent.object === node &&
                !isAllowed(parent)
            );
        }

        /**
         * Reports the given reference as a violation.
         * @param {eslint-scope.Reference} reference The reference to report.
         * @returns {void}
         */
        function report(reference) {
            const node = reference.identifier.parent;

            context.report({
                node,
                loc: node.loc,
                messageId: "unexpected"
            });
        }

        return {
            "Program:exit"(node) {
                const scope = sourceCode.getScope(node);
                const consoleVar = getVariableByName(scope, "console");
                const shadowed = consoleVar && consoleVar.defs.length > 0;

                /*
                 * 'scope.through' includes all references to undefined
                 * variables. If the variable 'console' is not defined, it uses
                 * 'scope.through'.
                 */
                const references = consoleVar
                    ? consoleVar.references
                    : scope.through.filter(isConsole);

                if (!shadowed) {
                    references
                        .filter(isMemberAccessExceptAllowed)
                        .forEach(report);
                }
            }
        };
    }
};