import {
  Sparkle,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

import Reveal from "../../components/ui/reveal";

import OpenAI from "../../assets/company/openai.png";
import Gitlab from "../../assets/company/gitlab.png";
import Github from "../../assets/company/github.png";
import Microsoft from "../../assets/company/microsoft.png";
import Google from "../../assets/company/google.png";
import Amazon from "../../assets/company/amazon.png";
import Meta from "../../assets/company/meta.png";
import Adobe from "../../assets/company/adobe.png";
import IBM from "../../assets/company/ibm.png";


const COMPANIES = [
  {
    name:"OpenAI",
    image:OpenAI,
  },
  {
    name:"GitLab",
    image:Gitlab,
  },
  {
    name:"GitHub",
    image:Github,
  },
  {
    name:"Microsoft",
    image:Microsoft,
  },
  {
    name:"Google",
    image:Google,
  },
  {
    name:"Amazon",
    image:Amazon,
  },
  {
    name:"Meta",
    image:Meta,
  },
  {
    name:"Adobe",
    image:Adobe,
  },
  {
    name:"IBM",
    image:IBM,
  },
];



const ORBIT_COMPANIES = [
  {
    name:"OpenAI",
    image:OpenAI,
    angle:-90,
    radius:300
  },

  {
    name:"GitLab",
    image:Gitlab,
    angle:-45,
    radius:300
  },

  {
    name:"GitHub",
    image:Github,
    angle:0,
    radius:300
  },

  {
    name:"Microsoft",
    image:Microsoft,
    angle:45,
    radius:300
  },

  {
    name:"Google",
    image:Google,
    angle:90,
    radius:300
  },

  {
    name:"Amazon",
    image:Amazon,
    angle:135,
    radius:300
  },

  {
    name:"Meta",
    image:Meta,
    angle:180,
    radius:300
  },

  {
    name:"Adobe",
    image:Adobe,
    angle:225,
    radius:300
  },
];



const ORBIT_BADGES = [

{
 label:"Project Completed",
 icon:CheckCircle2,
 position:"top-[120px] right-[170px]",
 type:"success"
},

{
 label:"Withdraw",
 icon:DollarSign,
 position:"left-[170px] top-[300px]",
 type:"danger"
},

{
 label:"AI Match",
 icon:Sparkle,
 position:"bottom-[140px] right-[180px]",
 type:"ai"
}

];



const HiringCompanies = () => {


return (

<section
className="
relative
overflow-hidden
py-32
"
>


<div
className="
container
mx-auto
px-6
"
>


{/* TRUSTED STRIP */}

<Reveal>

<div
className="
text-center
"
>

<p
className="
text-sm
font-medium
text-black/50
"
>
Trusted by 800,000 clients
</p>



<div

className="
mt-8
flex
items-center
justify-center
gap-12
flex-wrap
opacity-70
"

>

{
COMPANIES.slice(0,6).map(company=>(

<img

key={company.name}

src={company.image}

alt={company.name}

className="
h-8
w-auto
object-contain
grayscale
"

/>

))

}

</div>

</div>

</Reveal>





{/* ORBIT */}

<div

className="
relative
mx-auto
mt-28
h-[820px]
max-w-7xl
"

>

{/* OUTER ORBIT */}

<div

className="
absolute
left-1/2
top-1/2
h-[800px]
w-[800px]
-translate-x-1/2
-translate-y-1/2
rounded-full
border-2
border-gray-200
"

/>


{/* MIDDLE ORBIT */}

<div

className="
absolute
left-1/2
top-1/2
h-[600px]
w-[600px]
-translate-x-1/2
-translate-y-1/2
rounded-full
border
border-gray-300
"

 />



{/* INNER ORBIT */}

<div

className="
absolute
left-1/2
top-1/2
h-[400px]
w-[400px]
-translate-x-1/2
-translate-y-1/2
rounded-full
border
border-gray-300
"

 />


{/* COMPANY LOGOS */}

{
ORBIT_COMPANIES.map(company=>{


const x =
Math.cos(company.angle * Math.PI / 180)
*
company.radius;


const y =
Math.sin(company.angle * Math.PI / 180)
*
company.radius;


return (

<div

key={company.name}

style={{
transform:
`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
}}

className="
absolute
left-1/2
top-1/2
flex
h-16
w-16
items-center
justify-center
rounded-full
bg-white
shadow-md
border
border-black/10
"

>


<img

src={company.image}

alt={company.name}

className="
h-9
w-9
object-contain
"

/>


</div>

)

})

}{/* CENTER CONTENT */}


<div

className="
absolute
left-1/2
top-1/2
-translate-x-1/2
-translate-y-1/2
text-center
"

>


<h2

className="
text-6xl
font-semibold
leading-[0.95]
tracking-tight
"

>

Top Hiring
<br/>
Companies

</h2>




<div

className="
mx-auto
mt-8
flex
max-w-4xl
flex-wrap
justify-center
gap-3
"

>


{
[
"OpenAI",
"GitLab",
"Github",
"Microsoft",
"Google",
"Amazon",
"Meta",
"Adobe",
"IBM",
"Figma",
"Claude",
"Nvidia",
"+9012 More"
].map(company=>(


<span

key={company}

className="
rounded-full
border
border-black/10
bg-white
px-5
py-2.5
text-base
font-bold
tracking-tight
shadow-sm
"

>

{company}

</span>


))

}


</div>


</div>







{/* FLOATING BADGES */}


{
ORBIT_BADGES.map((badge)=>{


const Icon = badge.icon;


return (

<div

key={badge.label}


className={`
absolute
${badge.position}
flex
items-center
gap-2
rounded-full
px-5
py-3
text-sm
font-bold
shadow-lg
backdrop-blur

${
badge.type === "success"

?

"bg-green-100 text-green-700 border border-green-200"

:

badge.type === "danger"

?

"bg-rose-100 text-rose-700 border border-rose-200"

:

"bg-purple-100 text-purple-700 border border-purple-200"

}

`}


>


<Icon

size={16}

/>


<span>

{badge.label}

</span>


</div>


)

})

}



</div>


</div>


</section>


)

}


export default HiringCompanies;