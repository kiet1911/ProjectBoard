import { useNavigate } from "react-router-dom";


export default function NavbarBrand() {
    const navigate = useNavigate();
    return (
        <div className="w-25 aspect-3/2.5" onClick={()=>{navigate("/")}}>
            <img src="./src/assets/logoBrand.png" alt="logo" />
        </div>
    );
}