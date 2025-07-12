export const ArCondition = ({name,value}:{name:string,value:string})=>{
    return(
        <div className="flex flex-col items-center gap-1 p-2 border-2 group rounded bg-white shadow-md xl:w-[180px] sm:w-[120px] cursor:pointer hover:bg-yellow-700 transition-all duration-300">
            <span className="text-sm font-roboto font-semibold text-zinc-700 group-hover:text-white">{name}</span>
            <span className="text-lg font-montserrat font-semibold text-zinc-900 group-hover:text-white">{value}</span>
        </div>
    )
}