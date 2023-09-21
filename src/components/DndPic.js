import { useDrag } from "react-dnd";

const DndPic = ({ id, url }) => {
   
    const [{ isDragging }, drag] = useDrag( () => ({
        type: "image",
        item: {id: id},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const myImageStyle = { width:'100%', objectFit: 'cover', borderRadius:'6px', opacity: isDragging ? 0.5: 1};

    return ( 
        
        <img src={url} ref = {drag} style={myImageStyle} className={'imgmedia'}/>
    )
}
 
export default DndPic;