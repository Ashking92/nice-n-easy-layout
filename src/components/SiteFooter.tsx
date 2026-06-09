export function SiteFooter() {
  return (
    <footer className="bg-deep-navy text-on-primary">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div>
          <a className="text-headline-md font-headline-md font-bold text-warm-gold mb-6 block" href="/">Budget Homes</a>
          <p className="text-body-md text-on-primary/70 mb-6">
            Your gateway to affordable living. We specialize in quality residences at budget-friendly prices.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-on-primary/20 flex items-center justify-center hover:border-warm-gold hover:text-warm-gold transition-all" href="#">
              <span className="material-symbols-outlined">facebook</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-on-primary/20 flex items-center justify-center hover:border-warm-gold hover:text-warm-gold transition-all" href="#">
              <span className="material-symbols-outlined">alternate_email</span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-label-lg font-bold mb-6 text-warm-gold uppercase tracking-widest">Our Services</h4>
          <ul className="space-y-4">
            <li><a className="text-on-primary/70 hover:text-warm-gold transition-colors" href="#">Home Buying</a></li>
            <li><a className="text-on-primary/70 hover:text-warm-gold transition-colors" href="#">Investment</a></li>
            <li><a className="text-on-primary/70 hover:text-warm-gold transition-colors" href="#">Property Management</a></li>
            <li><a className="text-on-primary/70 hover:text-warm-gold transition-colors" href="#">Legal Assistance</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-label-lg font-bold mb-6 text-warm-gold uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-4">
            <li><a className="text-on-primary/70 hover:text-warm-gold transition-colors" href="/properties">Properties</a></li>
            <li><a className="text-on-primary/70 hover:text-warm-gold transition-colors" href="#">About Us</a></li>
            <li><a className="text-on-primary/70 hover:text-warm-gold transition-colors" href="#">Terms of Service</a></li>
            <li><a className="text-on-primary/70 hover:text-warm-gold transition-colors" href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-label-lg font-bold mb-6 text-warm-gold uppercase tracking-widest">Contact Info</h4>
          <div className="space-y-4 text-on-primary/70">
            <p className="flex items-start gap-3">
              <span className="material-symbols-outlined text-warm-gold">location_on</span>
              Shop No, C 118, 1st Floor, C Wing, Icchapurti Sai Prestige CHS Ltd, Nalasopara East, Maharashtra, 401209
            </p>
            <p className="flex items-center gap-3">
              <span className="material-symbols-outlined text-warm-gold">call</span>
              8828300415
            </p>
            <p className="flex items-center gap-3">
              <span className="material-symbols-outlined text-warm-gold">mail</span>
              ashish.budgethomes@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-on-primary/10 py-8 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-on-primary/50 text-label-sm">
          <p>© 2024 Budget Homes. All rights reserved. Nalasopara, Maharashtra.</p>
          <p>Designed for excellence in affordable housing.</p>
        </div>
      </div>
    </footer>
  );
}
