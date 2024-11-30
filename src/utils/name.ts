export function getFirstName(name:string){
    const names=name.split(' ');
    let sname=names[0];
    sname=sname.toLowerCase();
    return `${sname.slice(0,1).toUpperCase()}${sname.slice(1)}`;
 }
 