import { format } from 'date-fns'

export default {
  name: 'recipe',
  type: 'document',
  title: 'Recipe',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Recipe Title',
      description: 'The name of the recipe'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Page URL. (...com/this-text-here)',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'youtubeUrl',
      type: 'string',
      title: 'Youtube Link',
      description: 'Link to youtube video'
    },
    {
      name: 'shortDescription',
      type: 'string',
      title: 'Recipe Description',
      description: 'A brief description of the recipe'
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'This can be used to schedule post for publishing'
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image'
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category'
          }
        }
      ]
    },
    {
      name: 'information',
      type: 'bodyPortableText',
      title: 'Recipe Information',
      description: 'Information about the recipe'
    },
    {
      name: 'ingredients',
      type: 'bodyPortableText',
      title: 'Recipe Information',
      description: 'Information about the recipe. Shows up before ingredients & steps'
    },
    {
      name: 'prepTime',
      type: 'string',
      title: 'Prep time',
      description: 'example: 25 minutes'
    },
    {
      name: 'cookTime',
      type: 'string',
      title: 'Cook time',
      description: 'example: 25 minutes'
    },
    {
      name: 'servings',
      type: 'string',
      title: 'Servings',
      description: 'example: 4'
    },
    {
      name: 'stepsList',
      type: 'bodyPortableText',
      title: 'Steps'
    }
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare({ title = 'No title', publishedAt, slug = {}, media }) {
      try {
        const dateSegment = format(new Date(publishedAt), 'yyyy/MM')
        const path = `/${dateSegment}/${slug.current}/`
        return {
          title,
          media,
          subtitle: publishedAt ? path : 'Missing publishing date'
        }
      } catch (error) {
        return {
          title,
          media
        }
      }
    }
  }
}
