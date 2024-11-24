export const plugins = ['import'];
export const rules = {   
    'import/order': [
        'error',
        {
            groups: [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'index',
                'object',
            ],
            pathGroups: [
                {
                    pattern: 'react',
                    group: 'builtin',
                    position: 'before',
                },
                {
                    pattern: '{@apollo/**,react-router-dom}',
                    group: 'external',
                    position: 'before',
                },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
            alphabetize: {
                order: 'asc',
                caseInsensitive: true,
            },
            'newlines-between': 'always',
        },
    ],
};
  