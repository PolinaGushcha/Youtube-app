export interface Root {
    kind: string
    etag: string
    pageInfo: PageInfo
    items: Item[]
}
  
export interface PageInfo {
    totalResults: number
    resultsPerPage: number
}
  
export interface Item {
    kind: string
    etag: string
    id: string
    snippet: Snippet
    statistics: Statistics
}
  
export interface Snippet {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: Thumbnails
    channelTitle: string
    tags: string[]
    categoryId: string
    liveBroadcastContent: string
    localized: Localized
    defaultAudioLanguage: string
    defaultLanguage?: string
}
  
export interface Thumbnails {
    default: Default
    medium: Medium
    high: High
    standard: Standard
    maxres: Maxres
}
  
export interface Default {
    url: string
    width: number
    height: number
}
  
export interface Medium {
    url: string
    width: number
    height: number
}
  
export interface High {
    url: string
    width: number
    height: number
}
  
export interface Standard {
    url: string
    width: number
    height: number
}
  
export interface Maxres {
    url: string
    width: number
    height: number
}
  
export interface Localized {
    title: string
    description: string
}
  
export interface Statistics {
    viewCount: string
    likeCount: string
    dislikeCount: string
    favoriteCount: string
    commentCount: string
}
  