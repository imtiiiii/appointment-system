
export default class CustomHelpers {

   
    /**
       * Compute the feed data and return back expected data
       * @param  {} feedData
       * @returns feed array
     */
    feedResponse(feedData,ad=null){
       let i =0
        for(let d of feedData){
            try{
               d.files = (!d.files || d.files==null || d.files.length==0)?[]: JSON.parse(d.files)
             }catch(e){
               d.files =[]
             }
            d.comments = []
            d.meta_data = JSON.parse(d.meta_data)

            
        }
        return feedData
    }



}
