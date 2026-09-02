/**
 * Dynamically maps raw question subject keys to official section titles
 * matching the standardized Subject Breakdown & Sequencing specs defined in testData.ts.
 */
export function getOfficialSectionTitle(typeId?: string, rawSubject?: string): string {
  if (!rawSubject) return 'General Section';
  if (!typeId) return rawSubject;

  const cleanRaw = rawSubject.trim();
  const lower = cleanRaw.toLowerCase();

  // 1. NTS NAT & COMSATS variants (nat-ie, nat-im, nat-ics, nat-igs, nat-ia, nat-icom)
  if (typeId.startsWith('nat-')) {
    if (lower === 'english' || lower.includes('verbal')) return 'Verbal Ability';
    if (lower.includes('analytical')) return 'Analytical Reasoning';
    if (lower.includes('quantitative') || lower === 'math' || lower === 'mathematics') return 'Quantitative Reasoning';
    if (lower.includes('physic')) return 'Physics';
    if (lower.includes('chemist')) return 'Chemistry';
    if (lower.includes('biolog')) return 'Biology';
    if (lower.includes('computer') || lower === 'cs') return 'Computer Science';
    if (lower.includes('islam')) return 'Islamic Studies';
    if (lower.includes('pakistan')) return 'Pakistan Studies';
    if (lower.includes('general knowledge') || lower.includes('current affairs')) return 'General Knowledge & Current Affairs';
    if (lower.includes('account')) return 'Accounting';
    if (lower.includes('commerc')) return 'Commerce';
    if (lower.includes('economic')) return 'Economics';
  }

  // 2. PIEAS streams (pieas-eng, pieas-ics, pieas-med, pieas-gen)
  if (typeId.startsWith('pieas-')) {
    if (lower.includes('english') || lower.includes('verbal')) return 'Section (I) English';
    if (lower.includes('math')) return 'Section (II) Mathematics';
    if (lower.includes('biolog')) return 'Section (II) Biology';
    if (lower.includes('physic')) return 'Section (III) Physics';
    if (lower.includes('chemist')) return 'Section (IV) Chemistry';
    if (lower.includes('computer') || lower === 'cs') return 'Section (IV) Computer Science';
    if (lower.includes('statist')) return 'Section (IV) Statistics & Data Analysis';
  }

  // 3. AIR University streams (air-eng, air-med, air-ics, air-com, air-gen, air-art)
  if (typeId.startsWith('air-')) {
    if (lower.includes('english') || lower.includes('verbal')) return 'English';
    if (lower.includes('analytical') || lower.includes('logic')) return 'Analytical / Logical';
    if (lower.includes('math') || lower.includes('quant')) return 'Mathematics';
    if (lower.includes('physic')) return 'Physics';
    if (lower.includes('chemist')) return 'Chemistry';
    if (lower.includes('computer') || lower === 'cs') return 'Computer Science';
    if (lower.includes('biolog')) return 'Biology';
    if (lower.includes('statist')) return 'Statistics';
    if (lower.includes('economic')) return 'Economics';
    if (lower.includes('account')) return 'Accounting';
    if (lower.includes('commerc')) return 'Commerce';
    if (lower.includes('islam')) return 'Islamic Studies';
    if (lower.includes('pakistan')) return 'Pakistan Studies';
    if (lower.includes('general knowledge')) return 'General Knowledge';
  }

  // 4. BAHRIA University streams (bah-eng, bah-bus, bah-law, bah-med, bah-env)
  if (typeId.startsWith('bah-')) {
    if (typeId === 'bah-eng') {
      if (lower.includes('english') || lower.includes('verbal')) return 'Verbal Ability (English)';
      if (lower.includes('math')) return 'Mathematics';
      if (lower.includes('quant')) return 'Quantitative Reasoning';
      if (lower.includes('analytical')) return 'Analytical Reasoning';
      if (lower.includes('physic')) return 'Physics';
    }
    if (typeId === 'bah-bus') {
      if (lower.includes('english') || lower.includes('verbal')) return 'Verbal Ability (English)';
      if (lower.includes('quant') || lower.includes('math')) return 'Quantitative Reasoning';
      if (lower.includes('analytical') || lower.includes('gk') || lower.includes('general')) return 'General Knowledge / Analytical';
    }
    if (typeId === 'bah-law') {
      if (lower.includes('english') || lower.includes('verbal')) return 'English Verbal Ability';
      if (lower.includes('gk') || lower.includes('general') || lower.includes('pak')) return 'General Knowledge & Current Affairs';
      if (lower.includes('analytical') || lower.includes('iq')) return 'Analytical Reasoning & IQ';
    }
    if (typeId === 'bah-med') {
      if (lower.includes('biolog')) return 'Biology / Life Sciences';
      if (lower.includes('chemist')) return 'Chemistry';
      if (lower.includes('physic')) return 'Physics';
      if (lower.includes('english') || lower.includes('verbal')) return 'English Verbal';
    }
    if (typeId === 'bah-env') {
      if (lower.includes('english') || lower.includes('verbal')) return 'Verbal Ability (English)';
      if (lower.includes('quant') || lower.includes('math')) return 'Quantitative Reasoning';
      if (lower.includes('analytical')) return 'Analytical Reasoning';
      if (lower.includes('physic') || lower.includes('chemist') || lower.includes('science')) return 'Elective Science';
    }
  }

  // 5. CUST University streams (cust-comp, cust-eng, cust-bus, cust-med, cust-law)
  if (typeId.startsWith('cust-')) {
    if (typeId === 'cust-comp') {
      if (lower.includes('math') || lower.includes('quant')) return 'Quantitative Aptitude';
      if (lower.includes('english') || lower.includes('verbal')) return 'English / Verbal Ability';
      if (lower.includes('gk') || lower.includes('general')) return 'General Knowledge';
    }
    if (typeId === 'cust-eng') {
      if (lower.includes('math')) return 'Mathematics';
      if (lower.includes('physic')) return 'Physics';
      if (lower.includes('reading') || lower.includes('comprehension')) return 'Reading Comprehension';
      if (lower.includes('english')) return 'English';
    }
    if (typeId === 'cust-bus') {
      if (lower.includes('quant') || lower.includes('math')) return 'Quantitative Reasoning';
      if (lower.includes('english')) return 'English Aptitude';
      if (lower.includes('gk') || lower.includes('general')) return 'General Knowledge';
    }
    if (typeId === 'cust-med') {
      if (lower.includes('biolog')) return 'Biology / Life Sciences';
      if (lower.includes('chemist')) return 'Chemistry';
      if (lower.includes('physic')) return 'Physics';
      if (lower.includes('english')) return 'English';
    }
    if (typeId === 'cust-law') {
      if (lower.includes('gk') || lower.includes('pak') || lower.includes('general')) return 'General Knowledge & Pak Studies';
      if (lower.includes('english') || lower.includes('verbal')) return 'English Verbal';
      if (lower.includes('analytical') || lower.includes('logic')) return 'Analytical & Logical Reasoning';
    }
  }

  return cleanRaw;
}
