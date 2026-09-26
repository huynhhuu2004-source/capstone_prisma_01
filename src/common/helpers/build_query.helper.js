export const buildQueryPrisma = (req)=>{
    const pageDefalut= 1;
    const pageSizeDefault= 4;
    let {page,pageSize,filters}=req.query;
    console.log(page,pageSize,filters);
    //Phần filters
    try{ filters=JSON.parse(filters); }
    catch(error){
        filters= {};
    };
    //filer xử lý json 
    Object.entries(filters).forEach(([Key,value])=>{
        if(typeof value === "string"){
            filters[Key]= {contains :value}
        }
    } );

    const where= {  // spread syntax 
        isDeleted:false,
        ...filters,
    }

    //Check lỗi
   
    //chuyển sang số nếu truyền string ko parse số được chuyển sang mặc định
       page =Number(page) || pageDefalut ;
       pageSize= Number(pageSize) ||pageSizeDefault;

    //tranh TH So Am
       if (page < 1) page=1;
       if (pageSize<1) pageSize=3;

       const index= (page-1) * pageSize;

    return { where, page,pageSize,index}
}