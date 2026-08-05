import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Menu,
  X,
  Globe,
} from "lucide-react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../../components/ui/menubar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { Button } from "../../components/ui/button";
import Logo from "../../components/Logo";



const MENU_ITEMS = [
  {
    label:"Find Talent",
    sections:[
      {
        title:"Hire Professionals",
        items:[
          "Developers & Engineers",
          "Designers & Creatives",
          "Sales & Marketing",
          "AI Specialists",
        ]
      },
      {
        title:"Talent Solutions",
        items:[
          "Talent Marketplace",
          "Project Catalog",
          "Enterprise Hiring",
          "Recruitment Services",
        ]
      }
    ]
  },


  {
    label:"Find Work",
    sections:[
      {
        title:"Explore Opportunities",
        items:[
          "Jobs",
          "Remote Jobs",
          "Freelance Projects",
          "Contract Work",
        ]
      },
      {
        title:"Grow Your Career",
        items:[
          "AI Resume Builder",
          "Skills Assessment",
          "Career Coaching",
        ]
      }
    ]
  },


  {
    label:"Why Jobsters",
    sections:[
      {
        title:"For Companies",
        items:[
          "How It Works",
          "Success Stories",
          "Reviews",
        ]
      },
      {
        title:"For Talent",
        items:[
          "Earn More",
          "Build Your Profile",
          "Get Discovered",
        ]
      }
    ]
  },


  {
    label:"Pricing",
    sections:[
      {
        title:"Plans",
        items:[
          "Free",
          "Professional",
          "Enterprise",
        ]
      }
    ]
  },


  {
    label:"Enterprise",
    sections:[
      {
        title:"Solutions",
        items:[
          "Large Teams",
          "Global Hiring",
          "Workforce Management",
        ]
      }
    ]
  },

];





const Header = () => {


const [mobileOpen,setMobileOpen] = useState(false);
const [scrolled,setScrolled] = useState(false);



useEffect(()=>{

const handleScroll = () => {
  setScrolled(window.scrollY > 20);
};


window.addEventListener(
"scroll",
handleScroll
);


return () =>
window.removeEventListener(
"scroll",
handleScroll
);


},[]);





return (

<motion.header

initial={{
y:-24,
opacity:0
}}

animate={{
y:0,
opacity:1
}}

transition={{
duration:.5,
ease:"easeOut"
}}

className={`
sticky
top-0
z-50
w-full
transition-all
duration-300

${
scrolled
?
"bg-white shadow-sm backdrop-blur-xl"
:
"bg-transparent"
}

`}

>


<div

className="
container
mx-auto
flex
h-20
items-center
"

>


{/* LOGO */}


<a

href="#"

className="
mr-14
flex
items-center
"

>

<Logo />

</a>








{/* DESKTOP NAV */}



<Menubar

className="
hidden
border-none
bg-transparent
lg:flex
gap-1
"

>


{
MENU_ITEMS.map(menu=>(


<MenubarMenu

key={menu.label}

>


<MenubarTrigger

className="
cursor-pointer
bg-transparent
px-3
text-[14px]
font-semibold
text-ink/70
hover:bg-transparent
hover:text-ink
data-[state=open]:bg-transparent
"

>

{menu.label}


<ChevronDown

size={14}

className="ml-1"

/>


</MenubarTrigger>





<MenubarContent

align="start"

className="
mt-3
w-[650px]
rounded-2xl
border
bg-white
p-6
shadow-xl
"

>


<div

className="
grid
grid-cols-2
gap-8
"

>


{
menu.sections.map(section=>(


<div

key={section.title}

>


<h4

className="
mb-3
text-xs
font-semibold
uppercase
tracking-wide
text-black/40
"

>

{section.title}

</h4>



<div

className="
space-y-1
"

>


{
section.items.map(item=>(


<MenubarItem

key={item}

className="
cursor-pointer
rounded-lg
px-3
py-2
text-sm
font-medium
hover:bg-black/5
"

>

{item}

</MenubarItem>


))

}


</div>


</div>


))

}


</div>


</MenubarContent>



</MenubarMenu>


))

}


</Menubar>







{/* RIGHT ACTIONS */}



<div

className="
ml-auto
hidden
items-center
gap-5
lg:flex
"

>





<DropdownMenu>


<DropdownMenuTrigger

className="
flex
items-center
gap-2
text-sm
font-medium
text-ink/70
outline-none
hover:text-ink
"

>

<Globe size={15}/>

English (US)

<ChevronDown size={14}/>


</DropdownMenuTrigger>




<DropdownMenuContent

align="end"

className="
w-44
rounded-xl
"

>


<DropdownMenuItem>
English (US)
</DropdownMenuItem>


<DropdownMenuItem>
English (UK)
</DropdownMenuItem>

</DropdownMenuContent>


</DropdownMenu>





<button

className="
text-sm
font-semibold
text-ink
"

>

Sign In

</button>





<Button

size="sm"

className="
rounded-full
px-6
"

>

Get Started

</Button>



</div>









{/* MOBILE BUTTON */}


<button

className="
ml-auto
lg:hidden
"

onClick={()=>setMobileOpen(!mobileOpen)}

>

{
mobileOpen
?
<X size={22}/>
:
<Menu size={22}/>
}

</button>



</div>









{/* MOBILE MENU */}


{
mobileOpen && (

<motion.div

initial={{
height:0,
opacity:0
}}

animate={{
height:"auto",
opacity:1
}}

className="
bg-white
lg:hidden
"

>


<div

className="
container
flex
flex-col
gap-5
py-6
"

>


{
MENU_ITEMS.map(item=>(


<div

key={item.label}

className="
text-sm
font-semibold
"

>

{item.label}

</div>


))

}




<div

className="
flex
gap-3
pt-4
"

>


<Button

variant="outline"

className="w-full"

>

Sign In

</Button>




<Button

className="w-full"

>

Get Started

</Button>


</div>


</div>


</motion.div>

)

}


</motion.header>


)

}


export default Header;