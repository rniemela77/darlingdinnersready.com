export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gridsome-blog'
      }
    },
    { name: 'structure-menu' },
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '625b3f1c93d2615db5d8a5c9',
                  title: 'Sanity Studio',
                  name: 'darlingdinnersready-com-studio',
                  apiId: 'ac9a7a3f-e747-49ff-8e4d-bbc037a7e60c'
                },
                {
                  buildHookId: '625b3f1c1f553d608a90b754',
                  title: 'Blog Website',
                  name: 'darlingdinnersready-com',
                  apiId: '85a69132-8b6d-49f2-b1dd-d2142b3a09c0'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/rniemela77/darlingdinnersready.com',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://darlingdinnersready-com.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: { title: 'Recent recipes', order: '_createdAt desc', types: ['recipe'] },
      layout: { width: 'medium' }
    }
  ]
}
