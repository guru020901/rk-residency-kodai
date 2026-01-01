import siteSettings from './siteSettings'
import room from './room'
import pageBuilder from './pageBuilder'
import page from './page'

export const schemaTypes = [siteSettings, room, page, ...pageBuilder]
