export const specialties = [
  {
    id: 'gynecology-ivf',
    name: 'Gynecology, Obstetrics & IVF',
    shortDescription: 'Comprehensive care for female health, pregnancy, high-risk maternity, and advanced assisted reproductive treatments.',
    icon: 'Baby',
    badge: 'Women\'s Health & Reproductive Medicine',
    color: 'sky',
    image: `${import.meta.env.BASE_URL}images/hospital-building.jpg`,
    doctors: [
      {
        id: 'dr-mamta-bansal',
        name: 'Dr. Mamta Bansal',
        role: 'Senior Consultant Obstetrician & Laparoscopic Surgeon',
        qualifications: 'MBBS, DGO, DNB (Obs & Gyn), Minimal Access Surgery Specialist',
        experience: '16+ Years Experience',
        opd: 'Mon - Sat: 10:00 AM - 2:00 PM',
        image: `${import.meta.env.BASE_URL}images/dr-mamta-bansal-portrait.png`,
        bio: 'Dr. Mamta Bansal specializes in high-risk pregnancy care, painless vaginal deliveries, laparoscopic cystectomy/fibroid surgeries, and adolescent health.'
      },
      {
        id: 'dr-s-bansal',
        name: 'Dr. S. Bansal',
        role: 'Senior Gynecologist & Infertility Specialist',
        qualifications: 'MBBS, MS (Obstetrics & Gynecology), Fellow in Reproductive Medicine',
        experience: '15+ Years Experience',
        opd: 'Mon - Sat: 3:00 PM - 7:00 PM',
        image: `${import.meta.env.BASE_URL}images/dr-s-bansal.jpg`,
        bio: 'Dr. S. Bansal leads the IVF & Reproductive Medicine clinic, specializing in follicular tracking, AMH reserve workup, IUI, IVF/ICSI, and embryo transfer.'
      }
    ],
    highlights: [
      'Dedicated IVF & Embryology Laboratory',
      '24/7 Labor & Delivery Suite for Emergency Births',
      'Advanced High-Resolution Fetal Anomaly Sonography',
      'Laparoscopic & Hysteroscopic Surgical Unit'
    ]
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology & Eye Care',
    shortDescription: 'Advanced diagnostic eye care, micro-incision cataract surgeries, glaucoma screening, and computerized refractive vision care.',
    icon: 'Eye',
    badge: 'Eye Care & Vision Science',
    color: 'amber',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    doctors: [
      {
        id: 'dr-manish-bansal',
        name: 'Dr. Manish Bansal',
        role: 'Senior Consultant Eye Surgeon & Retina Specialist',
        qualifications: 'MBBS, MS (Ophthalmology), Fellow in Phacoemulsification & Vitreo-Retina',
        experience: '14+ Years Experience',
        opd: 'Mon - Sat: 11:00 AM - 6:00 PM',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
        bio: 'Dr. Manish Bansal is an expert eye surgeon specializing in stitchless Phaco cataract surgeries, premium IOL implants, glaucoma treatment, and diabetic retinopathy.'
      }
    ],
    highlights: [
      'Micro-Incision Phacoemulsification Cataract Suite',
      'Computerized Refraction & Automated Lensometer',
      'Non-Contact Tonometer for Glaucoma Pressure Testing',
      'Diabetic Eye Disease & Macular Screening'
    ]
  }
];

export const procedures = [
  {
    id: 'ivf-icsi',
    department: 'Gynecology & IVF',
    departmentId: 'gynecology-ivf',
    title: 'IVF & ICSI (Assisted Reproduction)',
    shortDescription: 'In Vitro Fertilization and Intracytoplasmic Sperm Injection for couples facing conception challenges.',
    duration: '14 - 20 Days Cycle',
    anesthesia: 'Mild Sedation for Retrieval',
    recovery: 'Same Day Discharge',
    image: `${import.meta.env.BASE_URL}images/ivf-lab-facility.jpg`,
    overview: 'IVF & ICSI are advanced assisted reproductive technologies designed to help couples achieve pregnancy. Oocytes are retrieved under ultrasound guidance and fertilized with sperm in our sterile embryology laboratory before precise transfer.',
    steps: [
      'Controlled Ovarian Stimulation with serial ultrasound tracking',
      'Ultrasound-guided egg retrieval under gentle sedation',
      'High-precision ICSI fertilization in sterile embryology lab',
      'Embryo culture to Day 3 or Blastocyst (Day 5)',
      'Pain-free embryo transfer into the uterine cavity'
    ],
    suitableFor: [
      'Tubal blockage or pelvic adhesions',
      'Male factor infertility (low count or motility)',
      'Unexplained infertility & multiple failed IUIs',
      'Age-related decline in ovarian reserve'
    ]
  },
  {
    id: 'iui-treatment',
    department: 'Gynecology & IVF',
    departmentId: 'gynecology-ivf',
    title: 'IUI (Intrauterine Insemination)',
    shortDescription: 'Direct placement of processed high-motility sperm into the uterus during ovulation.',
    duration: '30 Minutes Procedure',
    anesthesia: 'None (Painless)',
    recovery: 'Immediate Resume Activity',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    overview: 'IUI is a minimally invasive fertility procedure where concentrated, highly motile sperm are placed directly into the uterine cavity near the time of ovulation, increasing fertilization chances.',
    steps: [
      'Follicular tracking to determine exact ovulation timing',
      'Sperm washing & preparation in embryology lab',
      'Gentle insertion of thin catheter into uterine cavity',
      '15-minute resting period post procedure'
    ],
    suitableFor: [
      'Mild male factor subfertility',
      'Cervical factor issues or vaginismus',
      'Ovulatory disorders responsive to medication'
    ]
  },
  {
    id: 'laparoscopic-surgery',
    department: 'Gynecology & IVF',
    departmentId: 'gynecology-ivf',
    title: 'Laparoscopic Gynecological Surgery',
    shortDescription: 'Minimally invasive keyhole surgery for fibroids, ovarian cysts, and endometriosis.',
    duration: '1 - 2 Hours',
    anesthesia: 'General Anesthesia',
    recovery: '24 - 48 Hours Inpatient Stay',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    overview: 'Laparoscopy utilizes tiny keyhole incisions and a camera lens to perform surgical removal of ovarian cysts, uterine fibroids, tubal blockages, and pelvic endometriosis with minimal pain and rapid recovery.',
    steps: [
      'Pre-operative ultrasound and blood investigation',
      'Tiny 5mm keyhole incisions made in the abdominal wall',
      'Camera-assisted precision excision of cyst or fibroid',
      'Cosmetic dissolving stitches with minimal scarring'
    ],
    suitableFor: [
      'Ovarian dermoid or chocolate cysts (Endometrioma)',
      'Uterine fibroids causing heavy bleeding or pain',
      'Diagnostic evaluation of chronic pelvic pain or infertility'
    ]
  },
  {
    id: 'cataract-phaco',
    department: 'Ophthalmology & Eye Care',
    departmentId: 'ophthalmology',
    title: 'Cataract Phacoemulsification & IOL',
    shortDescription: 'Stitchless micro-incision cataract removal with premium foldable Intraocular Lens (IOL) implant.',
    duration: '15 - 20 Minutes',
    anesthesia: 'Topical Eye Drops (No Injection)',
    recovery: 'Walk-in Walk-out Procedure',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    overview: 'Phacoemulsification uses ultrasonic energy to break up the clouded natural lens (cataract) through a tiny 2.2mm micro-incision. A clear foldable Intraocular Lens (IOL) is then inserted to restore crisp, sharp vision.',
    steps: [
      'Pre-op computerized biometry (A-Scan) for precise lens power',
      'Topical anesthetic eye drops for a completely painless experience',
      'Ultrasonic phacoemulsification of the cloudy cataract lens',
      'Foldable Monofocal or Multifocal IOL implantation'
    ],
    suitableFor: [
      'Blurry or dim vision due to age-related cataract',
      'Glare while night driving or difficulty reading',
      'Progressive loss of color contrast'
    ]
  },
  {
    id: 'glaucoma-care',
    department: 'Ophthalmology & Eye Care',
    departmentId: 'ophthalmology',
    title: 'Glaucoma Diagnostics & IOP Management',
    shortDescription: 'Early detection and pressure control to protect the optic nerve and prevent vision loss.',
    duration: '30 Minutes Diagnostic',
    anesthesia: 'None',
    recovery: 'Immediate',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    overview: 'Glaucoma is often asymptomatic in early stages. Our eye unit utilizes Non-Contact Tonometry, Ophthalmoscopy, and Visual Field testing to detect elevated intraocular pressure and shield the optic nerve.',
    steps: [
      'Non-contact air-puff tonometry for intraocular pressure (IOP)',
      'Slit-lamp examination of optic nerve head',
      'Automated visual field perimeter mapping',
      'Customized eye drop regimen or laser iridotomy'
    ],
    suitableFor: [
      'Patients over 40 years with family history of glaucoma',
      'High myopia or elevated intraocular pressure',
      'Diabetic patients requiring annual eye pressure screening'
    ]
  },
  {
    id: 'retina-diabetic-care',
    department: 'Ophthalmology & Eye Care',
    departmentId: 'ophthalmology',
    title: 'Diabetic Retinopathy & Retina Screening',
    shortDescription: 'Specialized examination of the retina to detect and manage diabetic eye complications.',
    duration: '45 Minutes Evaluation',
    anesthesia: 'Dilating Drops',
    recovery: 'Temporary Blur for 2-3 Hours',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    overview: 'Diabetes can damage tiny retinal blood vessels. Early dilated fundus examination identifies microaneurysms, hemorrhages, and macular edema before irreversible vision damage occurs.',
    steps: [
      'Pupillary dilation with gentle eye drops',
      'High-magnification binocular indirect ophthalmoscopy',
      'Macular thickness and vascular leak evaluation',
      'Targeted medical management or laser photocoagulation'
    ],
    suitableFor: [
      'All individuals diagnosed with Type 1 or Type 2 Diabetes',
      'Patients experiencing sudden floaters or vision spots',
      'Hypertensive patients needing vascular retinal checkups'
    ]
  }
];
