export const deskStructure = (S: any) =>
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Global Settings')
                .id('siteSettings-list-item')
                .child(
                    S.document()
                        .schemaType('siteSettings')
                        .documentId('siteSettings')
                        .views([S.view.form()])
                ),
            S.divider(),
            ...S.documentTypeListItems().filter(
                (listItem: any) => !['siteSettings'].includes(listItem.getId())
            ),
        ])
