export interface Classfication{
    classificationId: number,
    userId: number,
    wikiId: number,
    title: string,
    text: string,
    groupId: string
}

export interface Wiki{
    wikiId: number,
    subjectId: number,
    updateDate: Date,
}

export interface UpdateWikiFormData{
    classificationId : number,
	subjectId: number,
    text : string
}

export interface WikiState{
    classfication : Classfication[] | null,
    wiki : Wiki | null,
    isLoadingWiki: boolean;
    updatingWikiSuccess : boolean;    
}