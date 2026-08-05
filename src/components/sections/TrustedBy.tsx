import Microsoft from "../../assets/company/microsoft.png";
import OpenAI from "../../assets/company/openai.png";
import Adobe from "../../assets/company/adobe.png";
import Ibm from "../../assets/company/ibm.png";
import Meta from "../../assets/company/meta.png";


const LOGOS = [
  {
    name:"Microsoft",
    image:Microsoft,
  },
  {
    name:"Ibm",
    image:Ibm,
  },
  {
    name:"OpenAI",
    image:OpenAI,
  },
  {
    name:"Meta",
    image:Meta,
  },
  {
    name:"Adobe",
    image:Adobe,
  },
];



const TrustedBy = () => {

return (

<section
className="
border-y
border-line
bg-paper
py-10
overflow-hidden
"
>


<div
className="
container
"
>


<p

className="
mb-8
text-center
text-xs
font-medium
uppercase
tracking-wide
text-muted
"

>
Trusted by 800,000 clients
</p>


</div>





<div

className="
relative
overflow-hidden
"

>


<div

className="
pointer-events-none
absolute
inset-y-0
left-0
z-10
w-32
bg-gradient-to-r
from-paper
to-transparent
"

/>


<div

className="
pointer-events-none
absolute
inset-y-0
right-0
z-10
w-32
bg-gradient-to-l
from-paper
to-transparent
"

/>





<div

className="
flex
animate-marquee
items-center
gap-20
w-max
"

>


{
LOGOS.map((logo)=>(


<div

key={logo.name}

className="
flex
h-12
w-32
items-center
justify-center
"

>


<img

src={logo.image}

alt={logo.name}

className="
h-8
w-auto
object-contain
grayscale
opacity-60
transition
hover:grayscale-0
hover:opacity-100
"

/>


</div>


))

}


</div>


</div>


</section>

)

}


export default TrustedBy;