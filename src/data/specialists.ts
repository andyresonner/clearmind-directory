export interface ReviewItem {
  name: string
  stars: string
  text: string
}

export interface Specialist {
  slug: string
  initials: string
  color: string
  name: string
  title: string
  affiliation: string
  city: string
  state: string
  rating: string
  reviews: number
  stars: string
  tags: string[]
  tagsAmber: string[]
  bio: string
  type: 'neurologist' | 'memory' | 'geriatric' | 'geriatrician'
  location: string
  phone: string
  insurance: string
  waitTime: string
  experience: string
  languages: string
  education: string
  specialties: string[]
  reviews_data: ReviewItem[]
}

export const specialists: Specialist[] = [
  {
    slug: "dr-michael-lepore-baltimore-md",
    initials: "ML",
    color: "linear-gradient(135deg,#2d7a6e,#3a9688)",
    name: "Dr. Michael Lepore, MD, PhD",
    title: "Behavioral Neurologist",
    affiliation: "Johns Hopkins Memory & Alzheimer's Treatment Center",
    city: "Baltimore, MD",
    state: "MD",
    rating: "4.9",
    reviews: 112,
    stars: "★★★★★",
    tags: ["Alzheimer's", "Lewy Body", "FTD"],
    tagsAmber: ["Accepting Patients"],
    bio: "Dr. Lepore is a board-certified behavioral neurologist at Johns Hopkins with over 18 years of experience diagnosing and treating all major forms of dementia. He completed his neurology residency at Johns Hopkins Hospital and a fellowship in cognitive neurology at UCSF. He is particularly known for his expertise in distinguishing between different dementia subtypes using advanced neuroimaging.",
    type: "neurologist",
    location: "601 N Caroline St, Baltimore, MD 21287",
    phone: "(410) 955-5000",
    insurance: "Medicare, Medicaid, Aetna, BlueCross BlueShield, CareFirst, UnitedHealthcare",
    waitTime: "~3 weeks",
    experience: "18 years",
    languages: "English",
    education: "Johns Hopkins University School of Medicine",
    specialties: ["Alzheimer's Disease", "Lewy Body Dementia", "Frontotemporal Dementia", "Mild Cognitive Impairment", "Memory Disorders", "Cognitive Assessment"],
    reviews_data: [
      { name: "Patricia H.", stars: "★★★★★", text: "Dr. Lepore took over an hour with us at our first appointment. He explained everything so clearly and gave my mother the most thorough evaluation she'd ever had." },
      { name: "William S.", stars: "★★★★★", text: "We drove 4 hours to see him and it was absolutely worth it. His diagnosis was precise and his care plan has made a real difference." }
    ]
  },
  {
    slug: "dr-carol-rentz-boston-ma",
    initials: "CR",
    color: "linear-gradient(135deg,#5a7dc8,#7090d8)",
    name: "Dr. Carol Rentz, PsyD",
    title: "Neuropsychologist",
    affiliation: "Massachusetts General Hospital Memory Disorders Unit",
    city: "Boston, MA",
    state: "MA",
    rating: "4.8",
    reviews: 89,
    stars: "★★★★★",
    tags: ["Neuropsychological Testing", "Early-Onset", "MCI"],
    tagsAmber: ["Accepting Patients"],
    bio: "Dr. Rentz is a leading neuropsychologist at Mass General specializing in the early detection of Alzheimer's disease through comprehensive cognitive testing. She is a co-investigator on multiple NIH-funded Alzheimer's prevention studies and has helped develop widely-used cognitive screening tools.",
    type: "memory",
    location: "15 Parkman St, Boston, MA 02114",
    phone: "(617) 726-2000",
    insurance: "Medicare, Aetna, BCBS, Harvard Pilgrim, Tufts Health Plan",
    waitTime: "~5 weeks",
    experience: "21 years",
    languages: "English",
    education: "Boston University School of Medicine",
    specialties: ["Neuropsychological Evaluation", "Early Detection", "MCI Monitoring", "Clinical Trial Enrollment", "Cognitive Rehabilitation"],
    reviews_data: [
      { name: "Anne T.", stars: "★★★★★", text: "The most thorough cognitive evaluation I've ever seen. Dr. Rentz caught things other doctors had missed for years." },
      { name: "Robert M.", stars: "★★★★☆", text: "Excellent doctor, very research-focused. Long wait time but absolutely worth it." }
    ]
  },
  {
    slug: "dr-john-ringman-chicago-il",
    initials: "JR",
    color: "linear-gradient(135deg,#7a5c9a,#9070b8)",
    name: "Dr. John Ringman, MD",
    title: "Neurologist & Dementia Specialist",
    affiliation: "Rush Alzheimer's Disease Center",
    city: "Chicago, IL",
    state: "IL",
    rating: "4.9",
    reviews: 74,
    stars: "★★★★★",
    tags: ["Familial Alzheimer's", "Genetic Counseling", "Clinical Trials"],
    tagsAmber: ["Accepting Patients"],
    bio: "Dr. Ringman directs the familial Alzheimer's disease program at Rush and is internationally recognized for his work in genetic forms of early-onset Alzheimer's. He offers genetic counseling and access to cutting-edge prevention trials for at-risk families.",
    type: "neurologist",
    location: "1750 W Harrison St, Chicago, IL 60612",
    phone: "(312) 942-5000",
    insurance: "Medicare, Medicaid, Aetna, BlueCross BlueShield Illinois, Humana, UHC",
    waitTime: "~4 weeks",
    experience: "20 years",
    languages: "English, Spanish",
    education: "UCLA David Geffen School of Medicine",
    specialties: ["Familial Alzheimer's Disease", "Genetic Risk Assessment", "Biomarker Testing", "Clinical Trial Access", "Preventive Care"],
    reviews_data: [
      { name: "Linda C.", stars: "★★★★★", text: "Our family has a history of early-onset Alzheimer's. Dr. Ringman is the only doctor who truly understood our situation and offered real answers." },
      { name: "Thomas W.", stars: "★★★★★", text: "Enrolled my father in a clinical trial through Dr. Ringman's program. The care and attention from the whole team has been exceptional." }
    ]
  },
  {
    slug: "dr-rosa-gutierrez-dallas-tx",
    initials: "RG",
    color: "linear-gradient(135deg,#c8752a,#d98f42)",
    name: "Dr. Rosa Gutierrez, MD",
    title: "Geriatric Psychiatrist",
    affiliation: "UT Southwestern Medical Center",
    city: "Dallas, TX",
    state: "TX",
    rating: "5.0",
    reviews: 58,
    stars: "★★★★★",
    tags: ["Behavioral Dementia", "Agitation Management", "Caregiver Support"],
    tagsAmber: ["Accepting Patients"],
    bio: "Dr. Gutierrez is a geriatric psychiatrist at UT Southwestern with deep expertise in the psychiatric and behavioral complications of dementia — including agitation, depression, delusions, and sleep disturbances. She takes a holistic approach that includes the whole family in the care process.",
    type: "geriatric",
    location: "5323 Harry Hines Blvd, Dallas, TX 75390",
    phone: "(214) 648-3111",
    insurance: "Medicare, Medicaid, Aetna, BCBS Texas, Cigna, Humana",
    waitTime: "~2 weeks",
    experience: "14 years",
    languages: "English, Spanish",
    education: "University of Texas Health Science Center",
    specialties: ["Behavioral & Psychological Symptoms of Dementia", "Medication Management", "Caregiver Counseling", "Depression in Dementia", "Sleep Disorders"],
    reviews_data: [
      { name: "Maria F.", stars: "★★★★★", text: "Dr. Gutierrez changed our lives. My husband's aggression was destroying our family. Within 6 weeks of her treatment plan, he was calm and we had our lives back." },
      { name: "James K.", stars: "★★★★★", text: "She takes time to listen to the caregiver too, not just the patient. That made all the difference for us." }
    ]
  },
  {
    slug: "dr-david-knopman-rochester-mn",
    initials: "DK",
    color: "linear-gradient(135deg,#3a7a5c,#4c9970)",
    name: "Dr. David Knopman, MD",
    title: "Behavioral Neurologist",
    affiliation: "Mayo Clinic Department of Neurology",
    city: "Rochester, MN",
    state: "MN",
    rating: "4.9",
    reviews: 201,
    stars: "★★★★★",
    tags: ["Alzheimer's", "Vascular Dementia", "FTD"],
    tagsAmber: [],
    bio: "One of the most published dementia researchers in the United States, Dr. Knopman has been a staff neurologist at Mayo Clinic for over 30 years. He specializes in all forms of dementia and leads multiple longitudinal aging studies that have shaped national treatment guidelines.",
    type: "neurologist",
    location: "200 First St SW, Rochester, MN 55905",
    phone: "(507) 284-2511",
    insurance: "Medicare, Most major insurers accepted",
    waitTime: "~8 weeks",
    experience: "30+ years",
    languages: "English",
    education: "University of Minnesota Medical School",
    specialties: ["All-cause Dementia", "Vascular Cognitive Impairment", "Dementia Research", "Longitudinal Care", "Second Opinions"],
    reviews_data: [
      { name: "Susan D.", stars: "★★★★★", text: "We flew from Florida for a second opinion. His diagnosis was completely different from what we'd been told and changed our father's treatment entirely." },
      { name: "George P.", stars: "★★★★★", text: "The best dementia doctor in the country, in my opinion. The wait is long but absolutely justified." }
    ]
  },
  {
    slug: "dr-gil-rabinovici-san-francisco-ca",
    initials: "GR",
    color: "linear-gradient(135deg,#c45c5c,#d47070)",
    name: "Dr. Gil Rabinovici, MD",
    title: "Behavioral Neurologist",
    affiliation: "UCSF Memory and Aging Center",
    city: "San Francisco, CA",
    state: "CA",
    rating: "4.9",
    reviews: 93,
    stars: "★★★★★",
    tags: ["PET Imaging", "Alzheimer's", "Lewy Body"],
    tagsAmber: ["Accepting Patients"],
    bio: "Dr. Rabinovici leads the UCSF Alzheimer's Disease Research Center and is a pioneer in amyloid PET imaging for early Alzheimer's diagnosis. He combines world-class research with compassionate clinical care for patients across the Bay Area and nationally.",
    type: "neurologist",
    location: "675 Nelson Rising Lane, San Francisco, CA 94158",
    phone: "(415) 353-2057",
    insurance: "Medicare, UCSF Health Plan, Aetna, BCBS, United",
    waitTime: "~6 weeks",
    experience: "17 years",
    languages: "English, Hebrew",
    education: "UCSF School of Medicine",
    specialties: ["Amyloid PET Imaging", "Early Alzheimer's Diagnosis", "Lewy Body Dementia", "Research-Linked Care", "Biomarker Evaluation"],
    reviews_data: [
      { name: "Helen W.", stars: "★★★★★", text: "Dr. Rabinovici used a PET scan to finally diagnose my father correctly after 3 years of uncertainty. We finally had answers." },
      { name: "David L.", stars: "★★★★★", text: "He's at the forefront of the field and still takes real time with patients. That combination is incredibly rare." }
    ]
  },
  {
    slug: "dr-james-fong-san-francisco-ca",
    initials: "JF",
    color: "linear-gradient(135deg,#1565c0,#42a5f5)",
    name: "Dr. James Fong, MD",
    title: "Geriatrician & Memory Care Specialist",
    affiliation: "UCSF Division of Geriatrics",
    city: "San Francisco, CA",
    state: "CA",
    rating: "4.8",
    reviews: 67,
    stars: "★★★★★",
    tags: ["Geriatric Assessment", "Memory Care", "Caregiver Support"],
    tagsAmber: ["Accepting Patients"],
    bio: "Dr. Fong provides whole-person memory care for older adults, integrating geriatric medicine with dementia specialty care. He is known for his detailed care plans, caregiver education sessions, and coordination with social services and community resources.",
    type: "geriatrician",
    location: "3333 California St, San Francisco, CA 94118",
    phone: "(415) 353-2400",
    insurance: "Medicare, Medicaid, BCBS, Aetna, Chinese Community Health Plan",
    waitTime: "~3 weeks",
    experience: "12 years",
    languages: "English, Cantonese, Mandarin",
    education: "Stanford University School of Medicine",
    specialties: ["Comprehensive Geriatric Assessment", "Dementia Care Planning", "Caregiver Education", "Social Services Coordination", "Palliative Care Integration"],
    reviews_data: [
      { name: "Amy C.", stars: "★★★★★", text: "Dr. Fong speaks Cantonese which meant everything to our family. My grandmother finally had a doctor she could talk to directly." },
      { name: "Kevin L.", stars: "★★★★★", text: "His care plan was the most thorough document I've ever received from any doctor. Every detail covered." }
    ]
  },
  {
    slug: "dr-mary-sano-new-york-ny",
    initials: "MS",
    color: "linear-gradient(135deg,#6a1b9a,#ab47bc)",
    name: "Dr. Mary Sano, PhD",
    title: "Neuropsychologist",
    affiliation: "Mount Sinai Alzheimer's Disease Research Center",
    city: "New York, NY",
    state: "NY",
    rating: "4.8",
    reviews: 142,
    stars: "★★★★★",
    tags: ["Neuropsychological Testing", "Clinical Trials", "Research"],
    tagsAmber: [],
    bio: "Dr. Sano directs the Alzheimer's Disease Research Center at Mount Sinai and has over 35 years of experience in Alzheimer's clinical trials and neuropsychological assessment. She has been a principal investigator on landmark studies that shaped current treatment standards.",
    type: "memory",
    location: "One Gustave L. Levy Place, New York, NY 10029",
    phone: "(212) 241-6500",
    insurance: "Medicare, Medicaid, Empire BlueCross, Aetna, UHC, Cigna",
    waitTime: "~6 weeks",
    experience: "35 years",
    languages: "English",
    education: "New York University",
    specialties: ["Comprehensive Neuropsychological Battery", "Clinical Trial Eligibility", "Cognitive Tracking", "Research Participation", "Expert Consultation"],
    reviews_data: [
      { name: "Barbara G.", stars: "★★★★★", text: "Dr. Sano is a legend in this field. My mother has been her patient for 4 years and the consistency and depth of care is unlike anything else." },
      { name: "Michael R.", stars: "★★★★☆", text: "Very research-oriented practice. Excellent for patients who want access to cutting-edge studies." }
    ]
  },
  {
    slug: "dr-james-lah-atlanta-ga",
    initials: "JL",
    color: "linear-gradient(135deg,#e65100,#ff9800)",
    name: "Dr. James Lah, MD, PhD",
    title: "Neurologist",
    affiliation: "Emory Cognitive Neurology Program",
    city: "Atlanta, GA",
    state: "GA",
    rating: "4.7",
    reviews: 55,
    stars: "★★★★☆",
    tags: ["Alzheimer's", "Biomarker Testing", "Clinical Trials"],
    tagsAmber: ["Accepting Patients"],
    bio: "Dr. Lah is co-director of Emory's Cognitive Neurology Program and a leading researcher in Alzheimer's biomarkers and tau pathology. He sees patients for comprehensive dementia evaluations and connects qualified patients to cutting-edge clinical trials.",
    type: "neurologist",
    location: "12 Executive Park Dr NE, Atlanta, GA 30329",
    phone: "(404) 778-3444",
    insurance: "Medicare, Medicaid, BCBS Georgia, Aetna, Cigna, UHC",
    waitTime: "~4 weeks",
    experience: "16 years",
    languages: "English",
    education: "Emory University School of Medicine",
    specialties: ["Alzheimer's Disease", "Tau Pathology", "CSF Biomarker Analysis", "Clinical Trial Screening", "Complex Dementia Cases"],
    reviews_data: [
      { name: "Dorothy H.", stars: "★★★★★", text: "Dr. Lah's testing was incredibly thorough. He found the cause of my father's decline when 3 other doctors couldn't." },
      { name: "Frank B.", stars: "★★★★☆", text: "Very knowledgeable doctor. The wait for an appointment is long but the care is excellent." }
    ]
  },
  {
    slug: "dr-karen-saban-phoenix-az",
    initials: "KS",
    color: "linear-gradient(135deg,#00695c,#00bfa5)",
    name: "Dr. Karen Saban, PhD, APRN",
    title: "Geriatric Nurse Practitioner",
    affiliation: "Banner Alzheimer's Institute",
    city: "Phoenix, AZ",
    state: "AZ",
    rating: "4.9",
    reviews: 88,
    stars: "★★★★★",
    tags: ["Caregiver Support", "Whole-Person Care", "Home Assessment"],
    tagsAmber: ["Accepting Patients"],
    bio: "Dr. Saban is a geriatric nurse practitioner and researcher at Banner Alzheimer's Institute, one of the nation's premier dementia research and care centers. She specializes in caregiver wellbeing, home safety assessments, and community-based dementia care.",
    type: "geriatrician",
    location: "901 E Willetta St, Phoenix, AZ 85006",
    phone: "(602) 839-6900",
    insurance: "Medicare, Medicaid, BCBS Arizona, Aetna, Banner Health Plans",
    waitTime: "~2 weeks",
    experience: "19 years",
    languages: "English, Spanish",
    education: "University of Arizona College of Nursing",
    specialties: ["Caregiver Education & Support", "Home Safety Evaluation", "Community Resources", "Behavioral Management", "Respite Planning"],
    reviews_data: [
      { name: "Patricia W.", stars: "★★★★★", text: "She saved me from caregiver burnout. Dr. Saban focused on ME as well as my husband and gave us both a better quality of life." },
      { name: "Carlos M.", stars: "★★★★★", text: "She came to our home for an assessment. That level of care and attention is incredibly rare." }
    ]
  },
  {
    slug: "dr-thomas-grabowski-seattle-wa",
    initials: "TG",
    color: "linear-gradient(135deg,#1a237e,#3949ab)",
    name: "Dr. Thomas Grabowski, MD",
    title: "Behavioral Neurologist",
    affiliation: "UW Memory & Brain Wellness Center",
    city: "Seattle, WA",
    state: "WA",
    rating: "4.8",
    reviews: 76,
    stars: "★★★★★",
    tags: ["Alzheimer's", "Brain Imaging", "Early Detection"],
    tagsAmber: ["Accepting Patients"],
    bio: "Dr. Grabowski directs the UW Memory & Brain Wellness Center and leads research in neuroimaging and Alzheimer's biomarkers. He brings a rigorous diagnostic approach combined with warm, patient-centered care to every evaluation.",
    type: "neurologist",
    location: "325 9th Ave, Seattle, WA 98104",
    phone: "(206) 744-9110",
    insurance: "Medicare, Regence BlueShield, Premera BCBS, Aetna, UHC",
    waitTime: "~5 weeks",
    experience: "22 years",
    languages: "English",
    education: "University of Iowa Carver College of Medicine",
    specialties: ["MRI & PET Neuroimaging", "Alzheimer's Prevention", "Mild Cognitive Impairment", "Precision Diagnostics", "Research Referrals"],
    reviews_data: [
      { name: "Nancy B.", stars: "★★★★★", text: "Dr. Grabowski uses brain scans in a way I'd never seen before. He showed us exactly what was happening and why. That clarity meant everything." },
      { name: "Steven A.", stars: "★★★★★", text: "One of the most knowledgeable doctors I've ever encountered. His care team is also exceptional." }
    ]
  },
  {
    slug: "dr-constantine-lyketsos-miami-fl",
    initials: "CL",
    color: "linear-gradient(135deg,#b71c1c,#ef5350)",
    name: "Dr. Constantine Lyketsos, MD",
    title: "Geriatric Psychiatrist",
    affiliation: "University of Miami Miller School of Medicine",
    city: "Miami, FL",
    state: "FL",
    rating: "4.7",
    reviews: 61,
    stars: "★★★★☆",
    tags: ["Behavioral Symptoms", "Depression & Dementia", "Vascular Dementia"],
    tagsAmber: ["Accepting Patients"],
    bio: "Dr. Lyketsos is a geriatric psychiatrist at the University of Miami with extensive expertise in treating the psychiatric complications of dementia, including depression, anxiety, sleep disorders, and behavioral disturbances. He is also a leading researcher in neuropsychiatric aspects of Alzheimer's.",
    type: "geriatric",
    location: "1120 NW 14th St, Miami, FL 33136",
    phone: "(305) 243-6400",
    insurance: "Medicare, Medicaid, BCBS Florida, Aetna, Cigna, Humana",
    waitTime: "~3 weeks",
    experience: "25 years",
    languages: "English, Greek",
    education: "University of Athens Medical School",
    specialties: ["Neuropsychiatric Symptoms of Dementia", "Depression in Older Adults", "Anxiety & Dementia", "Vascular Cognitive Impairment", "Medication Optimization"],
    reviews_data: [
      { name: "Elena P.", stars: "★★★★★", text: "My father became a different person after Dr. Lyketsos adjusted his medications. The aggression is gone. We are so grateful." },
      { name: "Richard N.", stars: "★★★★☆", text: "Very experienced and thoughtful doctor. Takes his time and doesn't rush to prescribe." }
    ]
  }
]
