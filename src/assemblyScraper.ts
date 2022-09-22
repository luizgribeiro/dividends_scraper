import got from "got";
import * as cheerio from "cheerio";
import {page} from "./pagina";
import fs from "fs";



(async ()=> {
    
    const tickers = ['petr4'];

    for (const ticker of tickers) { 
        
        const page = await got.get("http://dividendobr.com/tabex.php");
        const $ = cheerio.load(page.body)
        const tables = $("table", "#dilist" )
        
        type dividend = {
            company: string;
            date: string;
            type: string;
            exDate: string;
            paymentDate: string;
            value: string
        }
        
        tables.each( (idx, el)=> {
            const values: Array<string> = []; 
            $("td", el).each((i, el2)=> {
               switch (i) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 9:
                case 11:
                    values.push($(el2).text())
                    break;
                case 12:
                    console.log(" +++++++++++++++", $(el).text())
               } 
            })
            console.log(values) 
        })

        //$(tables).children("tr")//.each((i, el: any)=> {console.log("oi")})
        /*
        const rows = $(tableBody).children("tr")
        const summarized: Array<any> = [];
        const rowData: Array<any> = [];
        rows.each((i, element)=> {
                const rd: Array<any> = []
                $(element).children("td").each((i, el: any)=> {rd.push($.text(el.children))})
                rowData.push(rd)
        })
        
        const headers = "data_com,valor_abrev,data,tipo,valor_full";
        console.log(rowData)
        
        for (let i=0; i < rowData.length; i++ ) {
            const occurrences: Array<any>= [rowData[i]]; 
            const refDate = rowData[i][0]
            for(let j=i+1; j < rowData.length; j++) {
                const compDate = rowData[j][0];
                if (refDate === compDate) {
                    occurrences.push(rowData[j])
                }
            }
            console.log(occurrences) 
            
            if (occurrences.length === 1) {
                summarized.push([
                    occurrences[0][0],
                    occurrences[0][2],
                    occurrences[0][3],
                    parseFloat(occurrences[0][4])
                ])
            } else {
                const sum = occurrences.map(occ=> parseFloat(occ[4])).reduce((prev, curr)=> prev + curr, 0);
                summarized.push([
                    occurrences[0][0],
                    occurrences[0][2],
                    "sum",
                    sum
                ])
            }
        } 
        console.log(summarized)
        //const csvRows = rowData.map(row=> row.map((data: any) => data.replace(',', '.')).join(","))
        
        //console.log(csvRows)
        */

    }

})()