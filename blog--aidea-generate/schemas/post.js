import { defineType, defineField } from "sanity";
import { isUniqueAcrossAllDocuments } from "../../lib/isUniqueAcrossAllDocuments";

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 200,
                isUnique: isUniqueAcrossAllDocuments,
                // Em último caso basta apenas renover ou comentar o slugify: input => input
            //     slugify: input => input
            // .toLowerCase()
            // .replace(/\s+/g, '-')
            // .replace(/[^\w-]+/g, '')
            // .slice(0, 200)
            slugify: input => input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')           
        },
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: {type: 'author'},
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image', 
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{type: 'reference', to: {type: 'category'}}],
        }),
        defineField({
            name: 'publishedAt',
            title: 'PublishedAt',
            type: 'datetime',
        }),
        defineField({
            name: 'body',
            title: 'Body', 
            type: 'blockContent',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage',
        },
        /*prepare(selection) {
            const {author} = selection
            return {...selection, subtitle: author && `by ${author}`}
        }*/
    },
})