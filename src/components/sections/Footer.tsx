import Logo from "../Logo";
import { Separator } from "../ui/separator";

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 py-14">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="col-span-2">
          <Logo className="h-7 mb-4" />
          <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">
            AI-powered labour marketplace connecting talent with opportunity.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-400">All systems operational</span>
          </div>
        </div>
        {[
          { heading: 'For Talent',    links: ['Browse Jobs', 'Salary Guide', 'Career Resources', 'Resume Tips'] },
          { heading: 'For Employers', links: ['Post a Job', 'Find Talent', 'Pricing', 'Enterprise']             },
          { heading: 'Company',       links: ['About', 'Blog', 'Careers', 'Press']                              },
        ].map((col) => (
          <div key={col.heading}>
            <p className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4">{col.heading}</p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}><a href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
 
      <Separator className="bg-gray-100 mb-6" />
 
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Tribe Technologies Inc. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {['Privacy', 'Terms', 'Cookies'].map((item) => (
            <a key={item} href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">{item}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer