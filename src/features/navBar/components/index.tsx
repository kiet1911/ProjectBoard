import { useEffect , useRef, useState } from "react";
import { Menu } from "lucide-react";
import { MobileSidebar } from "./MobileSidebar";
import NavbarBrand from "../../../components/NavbarBrand";
import NavBarActionaAndMenu from "./NavBarActionaAndMenu";

function NavBar({ auth = false }: { auth: boolean }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if(!navRef.current){
       return
    }
    const resizeObserver = new ResizeObserver((entries)=>{
      for(let i of entries){
        if(i && i.contentRect.width > 768){
          //action 
          setIsOpen(false);
        }

      }
    })
    resizeObserver.observe(navRef.current);

    return () =>{
      resizeObserver.disconnect();
    }
  },[])
  
  return (
    <>
      <nav ref={navRef} className="w-full sticky top-0 flex justify-between items-center px-8 py-1 bg-white border-b border-black/10 z-40">
        {/* menu button hidden when screen is bigger than md */}
        <button
          onClick={() => setIsOpen(true)}
          className="hidden max-md:block p-2 border border-black/10 rounded"
        >
          <Menu />
        </button>

        {/* logo */}
        <NavbarBrand></NavbarBrand>

        <NavBarActionaAndMenu></NavBarActionaAndMenu> 

      </nav>

      <MobileSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
export default NavBar;
