import { LanguagesEnum } from "whatsapp_with_token/build/types/enums";
import { whatsappSendTextTemplate } from "../sendtext";
import { Person } from "../../../models/person";
import { getFirstName } from "../../../utils/name";

export async function waSendAskIsPerson1(serverNumber:string,name:string,personPhone:string){
    try{
        const params=[
            {
                "type": "header",
                parameters:[
                    {
                      "type": "text",
                      "text": `${getFirstName(name)}`
                    },
                ]}
            ,{
            "type": "body",
            parameters:[
                {
                  "type": "text",
                  "text": `${name}`
                },
            ]}]         
        return await whatsappSendTextTemplate(parseInt(personPhone),'is_person_1',LanguagesEnum.Portuguese_BR,serverNumber,params);
    }catch(e){
        throw e;
    }
}
