# Marlco Capital Insurance Agency Website

A modern, professional, mobile-first website for Marlco Capital Insurance Agency, a Kenya-based insurance intermediary serving individuals, SMEs, and corporate clients.

## 🌟 Features

- **Comprehensive Insurance Products**: Motor, Medical, Life, Property, Travel, and Business insurance
- **Multi-Step Quote Forms**: CRM-ready with validation and progress indicators
- **WhatsApp Integration**: Instant customer engagement via WhatsApp Business
- **Claims Assistance**: Dedicated claims support with step-by-step guidance
- **Insurance Insights Blog**: Educational content about insurance in Kenya
- **Mobile-First Design**: Fully responsive across all devices
- **SEO Optimized**: Kenya-focused keywords and meta tags
- **Fast Performance**: Optimized CSS and JavaScript

## 📁 Project Structure

```
marlco-capital-website/
├── index.html              # Home page
├── about.html              # About Us
├── products.html           # Insurance Products
├── quote.html              # Get a Quote (multi-step form)
├── claims.html             # Claims Assistance
├── blog.html               # Insurance Insights
├── contact.html            # Contact Us
├── css/
│   ├── main.css           # Main stylesheet with design system
│   └── responsive.css     # Responsive breakpoints
├── js/
│   ├── main.js            # Core functionality
│   └── forms.js           # Form validation and handling
├── images/                 # Image assets (placeholder)
└── assets/                 # Icons, logos, etc.
```

## 🎨 Design System

- **Color Palette**: Professional blue (#0047AB, #1E3A8A) and trust green (#10B981, #059669)
- **Typography**: Inter font family (Google Fonts)
- **Components**: Cards, buttons, forms, navigation, footer
- **Responsive**: Mobile-first with breakpoints at 640px (tablet) and 1024px (desktop)

## 🚀 Quick Start

1. **Open the website**: Simply open `index.html` in your web browser
2. **No build process required**: This is a static HTML/CSS/JS site

For local development with live reload:
```bash
# Using Python's built-in HTTP server
python -m http.server 8000

# Or using Live Server VS Code extension
# Install: code --install-extension ritwickdey.LiveServer
# Then right-click index.html and select "Open with Live Server"
```

## ⚙️ Configuration

Before deploying, update the following placeholders:

### 1. WhatsApp Number
In `js/main.js`, line 7:
```javascript
whatsappNumber: '254700000000', // Replace with actual WhatsApp Business number
```

### 2. Contact Information
Update phone numbers and email addresses in:
- Footer (all HTML files)
- Contact page (`contact.html`)
- Claims page (`claims.html`)

### 3. Google Analytics
Uncomment and update GA4 tracking ID in all HTML files:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

### 4. Form Submission
Choose form handling approach in `js/forms.js`:
- Option 1: Use FormSpree or similar service (add endpoint at line 9)
- Option 2: Implement backend API
- Option 3: Use mailto (not recommended for production)

## 📋 SEO Checklist

- ✅ Unique title tags for each page
- ✅ Meta descriptions with Kenya-focused keywords
- ✅ Proper heading hierarchy (H1-H6)
- ✅ Semantic HTML5 elements
- ✅ Alt text for images (to be added when images are included)
- ✅ Open Graph tags for social sharing
- ✅ Mobile-friendly responsive design
- ⏳ Schema markup (add LocalBusiness and InsuranceAgency schema)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔒 Privacy & Compliance

The website is designed with Kenya Data Protection Act (2019) compliance in mind:
- Privacy assurance messaging on forms
- Secure data handling (to be implemented with backend)
- Clear communication about data usage

## 📈 Performance Optimization

- CSS variables for efficient styling
- Minimal JavaScript dependencies (no frameworks)
- Lazy loading ready (implement when adding images)
- Optimized animations using CSS transitions

## 🛠️ Future Enhancements

- [ ] Add actual company photos and team images
- [ ] Integrate CRM system for form submissions
- [ ] Add schema markup for better SEO
- [ ] Implement blog CMS (e.g., NetlifyCMS, Strapi)
- [ ] Add Google Maps integration for office location
- [ ] Implement live chat widget
- [ ] Add client portal login
- [ ] Create admin dashboard for policy management

## 📄 License

© 2026 Marlco Capital Insurance Agency. All rights reserved.

## 🤝 Support

For questions or issues with the website, contact:
- Email: info@marlcocapital.co.ke
- Phone: +254 700 000 000
