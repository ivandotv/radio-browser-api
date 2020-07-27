module.exports = {
  preset: 'conventionalcommits',
  releaseRules: [
    {
      type: 'docs',
      scope: 'readme',
      release: 'patch'
    },
    {
      type: 'refactor',
      release: 'patch'
    }
  ],
  parserOpts: {
    noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
  },
  plugins: [
    ['@semantic-release/commit-analyzer'],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            {
              type: 'docs',
              scope: 'readme',
              hidden: false
            },
            {
              type: 'refactor',
              hidden: false
            }
          ]
        },
        writerOpts: {
          commitsSort: ['type', 'scope']
        }
      }
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: './CHANGELOG.md'
      }
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
        tarballDir: '.'
      }
    ],
    [
      '@semantic-release/git',
      {
        message:
          'chore(release): ${nextRelease.version} \n\n [skip ci] \n\n${nextRelease.notes}'
      }
    ],
    [
      '@semantic-release/github',
      {
        successComment: false
      }
    ]
  ]
}
