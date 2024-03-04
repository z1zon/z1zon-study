export const GRAPHQL_CACHE_REFERENCE_PREFIX = '@graphql-ref/';

export function isNormalizationId(id: string) {
  return id.startsWith(GRAPHQL_CACHE_REFERENCE_PREFIX);
}

export function getNormalizationId(typeName: string, id: string) {
  return `${GRAPHQL_CACHE_REFERENCE_PREFIX}${typeName}:${id}`;
}

export function normalization<T extends object>(data: T) {
  const resultKeys: string[] = [];

  const result = Object.entries(data).reduce<Record<string, any>>((cache, [key, value]) => {
    cache[key] = normalize(value as any, cache);

    return cache;
  }, {});

  function normalize(entity: any, _cache: Record<string, any>) {
    if (Array.isArray(entity)) {
      return entity.map((item) => normalize(item, _cache));
    }

    if (!entity?.__typename || !entity?.id) {
      return entity;
    }

    const { __typename, id } = entity;
    const normalizedId = getNormalizationId(__typename, id);
    resultKeys.push(normalizedId);

    if (!_cache[normalizedId]) {
      _cache[normalizedId] = { __typename, id };
    }

    Object.entries(entity).forEach(([key, value]) => {
      _cache[normalizedId][key] = normalize(value, _cache);
    });

    return normalizedId;
  }

  return { result, resultKeys };
}
