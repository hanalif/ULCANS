import { Pipe } from "@angular/core";


@Pipe({
    name: 'emphFirstLetter'
})
export class EmphFirstLetter{
    transform(str:string, fontSize:number, fontWeight:string | number){
        let words = str.split(" ");
        let styledWords = words.map(w=>{
            let firstChar = w[0];
            firstChar.toUpperCase()
            firstChar.fontsize(fontSize);
            console.log(firstChar);
            const newWord = this.replace(w, 0, firstChar);
            return newWord;
        })
        let styledStr = styledWords.toString();
        return styledStr;
    }

    replace(word:string,index:number, newfirstChar:string) {
        return word.substring(0, index) + newfirstChar + word.substring(index + newfirstChar.length);
    }

}
