import { parse, FieldNode, OperationDefinitionNode, SelectionSetNode } from 'graphql';
import merge from 'deepmerge';

import { GRAPHQL_CACHE_REFERENCE_PREFIX } from './normalization';

export class GraphQLCache {
  private store: Record<string, unknown>;
  // private subscriptions: [string[], () => void][];

  constructor() {
    this.store = {};
  }

  writeData(data: object) {
    this.store = merge(this.store, data, { arrayMerge: (_, source) => source });
  }

  read(query: string) {
    try {
      const document = parse(query);
      const definition = document.definitions[0] as OperationDefinitionNode;

      const rootTypeName = (definition.selectionSet.selections[0] as FieldNode).name.value;
      const rootType = this.store[rootTypeName];

      if (Array.isArray(rootType)) {
        return rootType.map((id) => this.readSelectionSet(definition.selectionSet, id));
      }
      return this.readSelectionSet(definition.selectionSet, rootType);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  // query에서 정규화 키 뽑아내고, 해당 키 변경있으면 callback 실행 (callback에서 상태 업데이트)
  subscribe(callback: () => void) {}

  private readSelectionSet(selectionSet: SelectionSetNode, rootId: any) {
    return selectionSet.selections.reduce((acc, selection) => {
      if (selection.kind === 'Field') {
        const fieldName = selection.name.value;
        // console.log(selection, rootId, fieldName);
        const fieldType = (this.store[rootId] as any)?.__typename;
        // const fieldType = (this.store[rootId] as any)[
        //   `${GRAPHQL_CACHE_REFERENCE_PREFIX}${fieldName}`
        // ].__typename;
        const fieldId = (this.store[rootId] as any)?.id;
        // const fieldId = (this.store[rootId] as any)[`${GRAPHQL_CACHE_REFERENCE_PREFIX}${fieldName}`]
        //   .id;
        const fieldValue = (this.store[`${GRAPHQL_CACHE_REFERENCE_PREFIX}${rootId}`] as any)?.[
          fieldName
        ];
        const cacheKey = `${fieldType}:${fieldId}`;
        console.log(fieldType, fieldId, rootId, fieldName, fieldValue);

        // if (!fieldType && fieldName === 'comments') {
        //   console.log(selectionSet.selections, fieldValue);
        // }

        if (selection.selectionSet && Array.isArray(fieldValue)) {
          acc[fieldName] = fieldValue.map((itemKey) => {
            // 배열의 각 항목이 객체(참조)인 경우
            console.log('key', itemKey);
            if (typeof itemKey === 'string') {
              return this.readSelectionSet(selection.selectionSet!, itemKey);
            } else {
              // 배열의 항목이 기본 타입인 경우
              return itemKey;
            }
          });
        } else if (selection.selectionSet) {
          // 하위 필드가 있으면 재귀적으로 처리합니다.
          acc[fieldName] = this.readSelectionSet(selection.selectionSet, cacheKey);
        } else {
          // 하위 필드가 없으면 값을 직접 가져옵니다.
          acc[fieldName] =
            fieldValue ||
            this.store[`${GRAPHQL_CACHE_REFERENCE_PREFIX}${cacheKey}`] ||
            (this.store[`${GRAPHQL_CACHE_REFERENCE_PREFIX}${rootId}`] as any)?.[fieldName];
        }
      }
      return acc;
    }, {});
  }
}
