export const deskStructure = (S: any) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Global Settings')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                ),
            S.divider(),
            ...S.documentTypeListItems().filter(
                (listItem: any) => !['siteSettings'].includes(listItem.getId())
            ),
        ])
