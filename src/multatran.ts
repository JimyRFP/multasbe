import { dentranReadNewEditalsEternal } from "./edital/read";
import { searchPersonPhonesEternal, updateFindedPersonPhonesWithCNPJEternal } from "./search/search";
import { startUserServer, startWaServer } from "./server";
import { shotDetranWarningEternal } from "./shots/warningshot";

function startSeach(){
     console.log('start search phone eternal');
     searchPersonPhonesEternal();
     console.log('start search in list eternal');
     updateFindedPersonPhonesWithCNPJEternal();
}

startSeach();
dentranReadNewEditalsEternal(); 
shotDetranWarningEternal();
startWaServer();
startUserServer();