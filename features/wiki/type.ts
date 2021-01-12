export interface Classification{
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

export interface WikiSubject {
    subjectId : number,
    subjectName : number,
    professor : number,
    year : number,
    semester : number,
}

export interface AddWikiFormData {
    wikiId : number | undefined,  
	userId : number,
	groupId : string, //사용자가 입력 한 그룹
	title : string,
    text : string | null
}

export interface UpdateWikiFormData{
    classificationId : number,
    wikiId : number,
    text : string
}

export interface CheckClassificationData {
    wikiId : number | undefined,  
	groupId : string 
}

export interface WikiState{
    classification : Classification[] | null,
    wiki : Wiki | null,
    isLoadingWiki: boolean;
    updatingWikiSuccess : boolean;      
    wikiSubject : WikiSubject | null;
    isWikiExist : boolean;
    isAble : number;
}   