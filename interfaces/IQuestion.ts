export interface IQuestion {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    categoryId: CategoryID;
    level: number;
}

export enum CategoryID {
    Angular001 = "angular001",
    Asp001 = "asp001",
    Dotnet001 = "dotnet001",
    Java001 = "java001",
    Js001 = "js001",
    Mongodb001 = "mongodb001",
    Oop001 = "oop001",
    React001 = "react001",
    Scrum001 = "scrum001",
    Sql001 = "sql001",
    Typescript001 = "typescript001",
    Web001 = "web001",
}
