import React, { useState } from 'react';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  AcademicCapIcon,
  TrophyIcon,
  NewspaperIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  HandRaisedIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface EB1AMockMaterialsGeneratorProps {
  language: 'en' | 'zh';
}

interface MockMaterial {
  id: string;
  title: string;
  title_zh: string;
  description: string;
  description_zh: string;
  category: string;
  category_zh: string;
  content: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function EB1AMockMaterialsGenerator({ language }: EB1AMockMaterialsGeneratorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<MockMaterial | null>(null);

  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;

  const mockMaterials: MockMaterial[] = [
    {
      id: 'award-certificate',
      title: 'Distinguished Achievement Award Certificate',
      title_zh: '杰出成就奖证书',
      description: 'Sample award certificate for national/international recognition',
      description_zh: '国家/国际认可的示例奖项证书',
      category: 'Awards',
      category_zh: '奖项',
      icon: TrophyIcon,
      content: `
INTERNATIONAL ASSOCIATION OF TECHNOLOGY PROFESSIONALS
═══════════════════════════════════════════════════════════

                    DISTINGUISHED ACHIEVEMENT AWARD
                              2023

This is to certify that

                          [YOUR NAME]

has been awarded the Distinguished Achievement Award in recognition of extraordinary 
contributions to the field of [YOUR FIELD] and outstanding professional excellence.

This award is presented annually to no more than 5 individuals worldwide who have 
demonstrated exceptional innovation, leadership, and impact in their field.

Selection Criteria:
• Demonstrated extraordinary ability and expertise
• Significant original contributions to the field
• International recognition of achievements
• Impact on industry practices and standards

Awarded this 15th day of October, 2023

_____________________                    _____________________
Dr. Sarah Johnson                        Prof. Michael Chen
President, IATP                         Selection Committee Chair

═══════════════════════════════════════════════════════════
This award recognizes individuals in the top 1% of their profession
Total Recipients Since 1995: 127 professionals worldwide
      `
    },
    {
      id: 'ieee-membership',
      title: 'IEEE Senior Membership Certificate',
      title_zh: 'IEEE高级会员证书',
      description: 'Sample IEEE Senior Member certificate and supporting documents',
      description_zh: 'IEEE高级会员证书及支持文件示例',
      category: 'Associations',
      category_zh: '协会',
      icon: UserGroupIcon,
      content: `
IEEE - Institute of Electrical and Electronics Engineers
═══════════════════════════════════════════════════════════

                    SENIOR MEMBER CERTIFICATE

This certifies that

                          [YOUR NAME]

has been elected to Senior Member grade of the Institute of Electrical and 
Electronics Engineers, effective [DATE].

Senior Member grade is conferred only upon individuals with significant 
performance in engineering practice, demonstrated by:

• Engineering experience of ten years or more
• Significant professional achievement and expertise
• Evidence of leadership in their professional field
• Recommendation by established Senior Members

Senior Membership represents the upper 7% of IEEE membership and requires 
outstanding professional achievement and competence.

Member Number: [MEMBER_ID]
Date of Election: [DATE]

_____________________
IEEE Director of Member Services

Verification: This certificate can be verified at ieee.org/membership-verification
      `
    },
    {
      id: 'media-coverage',
      title: 'Professional Journal Feature Article',
      title_zh: '专业期刊特写文章',
      description: 'Sample media coverage in professional publication',
      description_zh: '专业出版物媒体报道示例',
      category: 'Media',
      category_zh: '媒体',
      icon: NewspaperIcon,
      content: `
TECHNOLOGY INNOVATION QUARTERLY
Vol. 28, No. 3, Fall 2023                                        ISSN 1234-5678
═══════════════════════════════════════════════════════════════════════════════

SPOTLIGHT: RISING STARS IN TECHNOLOGY

Breakthrough Innovations Shaping the Future of [YOUR FIELD]

By Tech Innovation Quarterly Editorial Team

In our continuing series profiling the most influential emerging leaders in 
technology, we spotlight [YOUR NAME], whose groundbreaking work in [YOUR FIELD] 
has garnered international attention and is transforming industry practices.

[YOUR NAME]'s recent innovations have been adopted by major corporations 
including [COMPANY 1], [COMPANY 2], and [COMPANY 3], resulting in significant 
improvements in efficiency and cost reduction across multiple sectors.

"The work being done by [YOUR NAME] represents a paradigm shift in how we 
approach [SPECIFIC AREA]," commented Dr. Jane Smith, Director of Technology 
Assessment at the National Institute of Standards. "The practical applications 
and theoretical contributions are exceptional."

Key Achievements Highlighted:
• Development of revolutionary [TECHNOLOGY/METHOD]
• Recognition at the International [FIELD] Conference 2023
• 15+ peer-reviewed publications with 500+ citations
• Consulting for Fortune 500 companies

The impact of [YOUR NAME]'s work extends beyond immediate technical applications, 
influencing educational curricula at leading universities and setting new 
industry standards.

"We're seeing a new generation of solutions that wouldn't have been possible 
without the foundational work [YOUR NAME] has contributed," noted Prof. Michael 
Rodriguez from MIT.

[YOUR NAME] holds a Ph.D. from [UNIVERSITY] and currently serves as [POSITION] 
at [ORGANIZATION]. Their work has been featured in over 20 publications and 
continues to shape the future of [YOUR FIELD].

───────────────────────────────────────────────────────────────────────────────
Technology Innovation Quarterly (TIQ) is the leading publication for technology 
professionals, with a circulation of 50,000+ and distributed to 75 countries.
      `
    },
    {
      id: 'peer-review-invitation',
      title: 'Journal Peer Review Invitation',
      title_zh: '期刊同行评议邀请',
      description: 'Sample invitation to serve as peer reviewer for prestigious journal',
      description_zh: '担任权威期刊同行评议员的邀请示例',
      category: 'Judging',
      category_zh: '评判',
      icon: HandRaisedIcon,
      content: `
JOURNAL OF ADVANCED [YOUR FIELD] RESEARCH
Impact Factor: 4.832 | Publisher: Academic Excellence Press
═══════════════════════════════════════════════════════════

Dear Dr. [YOUR NAME],

INVITATION TO SERVE AS PEER REVIEWER

We are pleased to invite you to join our distinguished panel of peer reviewers 
for the Journal of Advanced [YOUR Field] Research (JAFR), one of the leading 
publications in the field with an impact factor of 4.832.

Your expertise in [SPECIFIC AREA] and your outstanding contributions to the 
field, as evidenced by your recent publications and international recognition, 
make you an ideal candidate for our peer review panel.

Journal Statistics:
• Impact Factor: 4.832 (Top 5% in field)
• Acceptance Rate: 12%
• International Editorial Board
• 25,000+ subscribers globally
• Published by Academic Excellence Press

Reviewer Selection Criteria:
• Ph.D. in relevant field
• Minimum 5 years post-doctoral experience
• Record of high-quality publications
• International recognition in specialty area
• Demonstrated expertise in research methodology

We specifically invite you to review manuscripts in the following areas:
- [AREA 1]
- [AREA 2]
- [AREA 3]

The review process typically involves 2-3 manuscripts per year, with a 
commitment to provide thorough, constructive feedback within 4 weeks of 
assignment.

Your expertise in [SPECIFIC TECHNOLOGY/METHOD] would be particularly valuable 
to our editorial process, given the increasing number of submissions in this 
emerging area.

Please confirm your willingness to serve by responding to this invitation. 
We will then provide you with detailed reviewer guidelines and access to our 
manuscript management system.

Thank you for considering this opportunity to contribute to the advancement 
of scientific knowledge in [YOUR FIELD].

Sincerely,

Dr. Elizabeth Harper, Ph.D.
Editor-in-Chief
Journal of Advanced [YOUR Field] Research
editor@jafr-journal.org

───────────────────────────────────────────────────────────────────────────────
This invitation is extended only to recognized experts who meet our stringent 
reviewer qualifications. JAFR maintains the highest standards of peer review 
in the academic community.
      `
    },
    {
      id: 'contribution-evidence',
      title: 'Original Contribution Impact Statement',
      title_zh: '原创贡献影响声明',
      description: 'Documentation of significant original contribution with adoption evidence',
      description_zh: '重要原创贡献及采用证据的文档',
      category: 'Contributions',
      category_zh: '贡献',
      icon: SparklesIcon,
      content: `
IMPACT ASSESSMENT REPORT
Original Contribution: [YOUR INNOVATION/METHOD]
═══════════════════════════════════════════════════════════

EXECUTIVE SUMMARY

This report documents the significant impact and widespread adoption of the 
[YOUR INNOVATION/METHOD] developed by [YOUR NAME] in [YEAR].

INNOVATION OVERVIEW
The [INNOVATION NAME] represents a breakthrough approach to [PROBLEM AREA], 
offering [KEY BENEFITS]. This original contribution has fundamentally changed 
how practitioners approach [SPECIFIC CHALLENGE].

ADOPTION METRICS

Industry Implementation:
• 15+ Fortune 500 companies have adopted the methodology
• Implemented across 35 countries
• Cost savings: $50M+ documented across implementations
• Efficiency improvements: 35-60% average increase

Academic Recognition:
• 45+ peer-reviewed citations since publication
• Incorporated into curriculum at 12 major universities
• Referenced in 8 industry standards documents
• Presented at 20+ international conferences

Open Source Impact:
• GitHub repository: 5,000+ stars, 1,200+ forks
• Downloaded 50,000+ times
• Active contributor community: 150+ developers
• Used in 300+ derived projects

TESTIMONIALS

"The [INNOVATION] has revolutionized our approach to [AREA]. We've seen 
unprecedented improvements in both efficiency and quality since implementation."
- Dr. Sarah Wilson, CTO, Global Tech Solutions

"This represents the most significant advancement in [FIELD] in the past decade. 
Our entire department has restructured processes around these principles."
- Prof. James Chen, Stanford University

INDUSTRY TRANSFORMATION

The widespread adoption of [YOUR INNOVATION] has created a new paradigm in 
[FIELD], with:

• New professional certification programs incorporating the methodology
• Industry conferences dedicated to implementations
• Specialized consulting services emerging around the approach
• Professional associations updating best practice guidelines

QUANTITATIVE IMPACT

Financial Impact:
• Direct cost savings: $50M+ (documented)
• Revenue generation: $200M+ (attributed to efficiency gains)
• ROI for implementing organizations: 300-500%

Performance Metrics:
• Processing time reduction: 40-70%
• Error rate reduction: 60-80%
• Resource utilization improvement: 35-55%

PEER VALIDATION

Independent assessment by the [PROFESSIONAL ASSOCIATION] concluded:
"The [INNOVATION] meets all criteria for extraordinary contribution to the field, 
demonstrating both theoretical rigor and practical significance that has 
transformed industry practices."

CONCLUSION

The evidence clearly demonstrates that [YOUR INNOVATION] represents an original 
contribution of major significance to [FIELD], with documented widespread 
adoption and measurable impact on both academic understanding and industry 
practice.

───────────────────────────────────────────────────────────────────────────────
This assessment is based on independent verification of adoption metrics, 
citation analysis, and stakeholder interviews conducted by [ASSESSMENT FIRM].
      `
    },
    {
      id: 'scholarly-article',
      title: 'Peer-Reviewed Journal Article',
      title_zh: '同行评议期刊文章',
      description: 'Sample published article in high-impact journal',
      description_zh: '高影响因子期刊发表文章示例',
      category: 'Publications',
      category_zh: '出版物',
      icon: AcademicCapIcon,
      content: `
INTERNATIONAL JOURNAL OF [YOUR FIELD]
Vol. 42, Issue 3, March 2023, Pages 156-173
Impact Factor: 5.247 | Publisher: Scientific Publications Ltd.
═══════════════════════════════════════════════════════════

Revolutionary Approaches to [SPECIFIC TOPIC]:
A Comprehensive Framework for [APPLICATION AREA]

[YOUR NAME]¹, Dr. Collaborator A², Prof. Collaborator B³

¹[Your Institution], [Department]
²[Institution 2], [Department]
³[Institution 3], [Department]

ABSTRACT

Background: Current methodologies in [FIELD] face significant challenges in 
[PROBLEM AREA], limiting practical applications and theoretical advancement.

Objective: To develop and validate a novel framework addressing key limitations 
in [SPECIFIC AREA] while maintaining computational efficiency and theoretical rigor.

Methods: We propose the [METHOD NAME], incorporating [KEY INNOVATIONS]. 
Validation was performed using [DATASETS/EXPERIMENTS] with comparison to 
state-of-the-art approaches.

Results: The proposed method demonstrates 45% improvement in [METRIC 1] and 
60% reduction in [METRIC 2] compared to existing approaches. Statistical 
significance (p < 0.001) was achieved across all test scenarios.

Conclusions: This work establishes a new paradigm for [APPLICATION], with 
implications extending to [RELATED AREAS]. The framework's adaptability 
suggests broad applicability across [FIELD] domains.

Keywords: [KEYWORD 1], [KEYWORD 2], [KEYWORD 3], [KEYWORD 4]

1. INTRODUCTION

The challenge of [PROBLEM] has long been recognized as fundamental to 
advancing [FIELD]. Despite decades of research, existing approaches 
remain limited by [SPECIFIC LIMITATIONS].

Recent work by [RESEARCHERS] highlighted the need for novel approaches 
that can address [CHALLENGE] while maintaining [REQUIREMENTS]. This paper 
introduces a comprehensive framework that addresses these challenges 
through [APPROACH].

2. METHODOLOGY

2.1 Theoretical Framework

The proposed [METHOD NAME] is based on [THEORETICAL FOUNDATION]. Unlike 
previous approaches that rely on [TRADITIONAL APPROACH], our method 
leverages [INNOVATION] to achieve [BENEFIT].

[Detailed technical content would continue...]

3. EXPERIMENTAL VALIDATION

3.1 Dataset and Metrics

Evaluation was conducted using [DATASETS], comprising [DETAILS]. Performance 
was measured using standard metrics including [METRICS].

3.2 Results

Table 1 presents comparison results against state-of-the-art methods:

Method                  | Metric 1 | Metric 2 | Metric 3
[EXISTING METHOD 1]     | 0.78     | 45.2     | 12.3
[EXISTING METHOD 2]     | 0.82     | 42.1     | 11.8
[YOUR METHOD]           | 0.94     | 28.5     | 8.7

4. DISCUSSION AND IMPLICATIONS

The significant improvements demonstrated by [YOUR METHOD] suggest fundamental 
advances in understanding [THEORETICAL ASPECT]. The practical implications 
include [APPLICATIONS].

5. CONCLUSIONS

This work introduces a novel framework for [PROBLEM], demonstrating substantial 
improvements over existing approaches. Future work will explore [FUTURE DIRECTIONS].

ACKNOWLEDGMENTS

The authors thank [COLLABORATORS] for valuable discussions and [FUNDING AGENCY] 
for financial support (Grant #[NUMBER]).

REFERENCES

[1] [Reference 1]
[2] [Reference 2]
...
[45] [Reference 45]

───────────────────────────────────────────────────────────────────────────────
Received: January 15, 2023; Accepted: February 28, 2023; Published: March 15, 2023
Citations: 23 (as of current date) | Downloads: 1,247
      `
    },
    {
      id: 'leadership-role',
      title: 'Critical Role Documentation',
      title_zh: '关键角色文档',
      description: 'Evidence of leading/critical role in distinguished organization',
      description_zh: '在杰出组织中担任领导/关键角色的证据',
      category: 'Leadership',
      category_zh: '领导力',
      icon: BriefcaseIcon,
      content: `
DISTINGUISHED ORGANIZATION IMPACT STATEMENT
[ORGANIZATION NAME] - Critical Role Documentation
═══════════════════════════════════════════════════════════

ORGANIZATION OVERVIEW

[ORGANIZATION NAME] is recognized as a leading institution in [FIELD], with:
• Annual budget: $500M+
• Global reach: 50+ countries
• Staff: 5,000+ professionals
• Established: 1985
• Recognition: Top-tier industry association by [RANKING BODY]

POSITION DETAILS

Role: [YOUR TITLE]
Department: [DEPARTMENT]
Reporting Structure: Reports to [SENIOR EXECUTIVE]
Team Size: 25+ direct and indirect reports
Budget Responsibility: $15M annual budget

CRITICAL RESPONSIBILITIES

Strategic Leadership:
• Led development of organization's 5-year strategic plan
• Managed $15M budget for [INITIATIVE NAME]
• Directed cross-functional teams across 8 countries
• Established partnerships with 15+ Fortune 500 companies

Technical Innovation:
• Spearheaded adoption of cutting-edge [TECHNOLOGY]
• Reduced operational costs by 30% through process optimization
• Implemented new methodologies adopted organization-wide
• Led technical standards committee (40+ member organizations)

Organizational Impact:
• Increased department efficiency by 45%
• Established new revenue stream generating $8M annually
• Mentored 50+ professionals, with 15 receiving promotions
• Represented organization at 25+ international conferences

KEY ACHIEVEMENTS

Project Alpha (2022-2023):
• Led organization's largest initiative ($10M budget)
• Delivered 6 months ahead of schedule
• Resulted in 40% improvement in key performance metrics
• Recognized with Organization Excellence Award

Industry Leadership:
• Chaired Technical Standards Committee (2021-2023)
• Member of Executive Advisory Board
• Led inter-organizational collaboration involving 12 institutions
• Established new industry best practices adopted globally

Innovation Initiatives:
• Developed proprietary methodology now used organization-wide
• Filed 3 patents on behalf of organization
• Created training programs attended by 500+ professionals
• Established Center of Excellence for [SPECIALTY AREA]

ORGANIZATIONAL DISTINCTION

[ORGANIZATION NAME] Recognition:
• Ranked #1 by [INDUSTRY RANKING] for 5 consecutive years
• Winner of [PRESTIGIOUS AWARD] 2023
• Accredited by [ACCREDITATION BODY]
• Partnership agreements with top global institutions

Financial Standing:
• Annual revenue: $500M+
• Operating in 50+ countries
• Serves 10,000+ clients globally
• AAA credit rating from [RATING AGENCY]

Industry Leadership:
• Sets standards adopted by 200+ organizations
• Publishes guidelines used in 75+ countries
• Hosts premier annual conference (5,000+ attendees)
• Research citations: 10,000+ annually

TESTIMONIALS

"[YOUR NAME]'s leadership has been transformational for our organization. 
The strategic initiatives they've led have positioned us as the industry leader."
- [CEO NAME], Chief Executive Officer

"Under [YOUR NAME]'s direction, our technical capabilities have advanced 
significantly. Their vision and execution are exceptional."
- [CTO NAME], Chief Technology Officer

"The impact of [YOUR NAME]'s work extends far beyond our organization. 
They've influenced industry-wide practices and standards."
- [EXTERNAL EXPERT], Industry Advisory Board Chair

MEASURABLE IMPACT

Financial Performance:
• Cost reduction: $25M over 3 years
• Revenue generation: $8M new annual revenue stream
• ROI on initiatives: 250% average
• Budget management: $0 overruns in 3 years

Operational Excellence:
• Efficiency improvement: 45%
• Quality metrics: 60% improvement
• Client satisfaction: 95% (industry average: 78%)
• Employee retention: 94% (industry average: 82%)

Industry Influence:
• Standards adopted by 200+ organizations
• Best practices referenced in 15+ publications
• Speaking engagements: 25+ annually
• Professional mentorship: 50+ individuals

───────────────────────────────────────────────────────────────────────────────
This documentation is verified by [ORGANIZATION] HR Department and validated 
by independent assessment conducted by [CONSULTING FIRM].
      `
    },
    {
      id: 'salary-evidence',
      title: 'High Remuneration Documentation',
      title_zh: '高薪酬文档',
      description: 'Comprehensive salary evidence with industry comparisons',
      description_zh: '包含行业比较的综合薪资证据',
      category: 'Salary',
      category_zh: '薪资',
      icon: CurrencyDollarIcon,
      content: `
COMPENSATION ANALYSIS REPORT
High Remuneration Evidence for EB1A Petition
═══════════════════════════════════════════════════════════

EXECUTIVE SUMMARY

This report provides comprehensive documentation of [YOUR NAME]'s compensation 
relative to industry standards, demonstrating exceptional remuneration in the 
top percentile of [YOUR FIELD] professionals.

CURRENT COMPENSATION DETAILS

Base Salary: $[AMOUNT] annually
Performance Bonus: $[AMOUNT] (2023)
Stock Options: $[VALUE] (current valuation)
Benefits Package: $[VALUE] annually
Total Compensation: $[TOTAL] annually

Position: [YOUR TITLE]
Company: [COMPANY NAME]
Industry: [INDUSTRY]
Location: [LOCATION]
Experience Level: [YEARS] years

INDUSTRY COMPARISON DATA

Source: [AUTHORITATIVE SALARY SURVEY 2023]
Sample Size: 15,000+ professionals in [FIELD]
Geographic Scope: United States
Data Collection: January-March 2023

Percentile Analysis:
90th Percentile: $[AMOUNT]
95th Percentile: $[AMOUNT]
99th Percentile: $[AMOUNT]
[YOUR SALARY]: $[AMOUNT] (99.5th percentile)

Role-Specific Comparison:
Average [YOUR TITLE]: $[AMOUNT]
Median [YOUR TITLE]: $[AMOUNT]
Top 10% [YOUR TITLE]: $[AMOUNT]
[YOUR COMPENSATION]: [X]% above average

GOVERNMENT DATA VERIFICATION

U.S. Bureau of Labor Statistics (2023):
Occupation Code: [SOC CODE]
Median Annual Wage: $[AMOUNT]
Top 10% Annual Wage: $[AMOUNT]
[YOUR SALARY]: [X]% above top 10%

Department of Labor Statistics:
• [YOUR FIELD] professionals: 250,000+ nationwide
• Average salary: $[AMOUNT]
• Your percentile: 99.2%

PROFESSIONAL SURVEY DATA

[PROFESSIONAL ASSOCIATION] Salary Survey 2023:
• Respondents: 8,500+ members
• Geographic coverage: All 50 states
• Experience levels: Entry to Executive

Key Findings:
• Average compensation: $[AMOUNT]
• Senior-level average: $[AMOUNT]
• Executive-level average: $[AMOUNT]
• [YOUR COMPENSATION]: Top 1% bracket

Specialized Role Analysis:
[YOUR SPECIALTY] professionals:
• Average: $[AMOUNT]
• Senior: $[AMOUNT]
• Expert: $[AMOUNT]
• [YOUR LEVEL]: [X]% premium

COMPENSATION COMPONENTS BREAKDOWN

Base Salary Comparison:
Industry Average: $[AMOUNT]
Your Base Salary: $[AMOUNT]
Premium: [X]% above average

Performance-Based Compensation:
• Annual bonus: $[AMOUNT] (top 5% range)
• Stock options: $[VALUE] (executive-level package)
• Profit sharing: $[AMOUNT] (available to <10% of workforce)

Additional Benefits:
• Executive benefits package: $[VALUE]
• Professional development allowance: $[AMOUNT]
• Research funding allocation: $[AMOUNT]

COMPARATIVE ANALYSIS BY EXPERIENCE

Experience Level: [YEARS] years
Peer Group Average: $[AMOUNT]
Your Compensation: $[AMOUNT]
Differential: +[X]%

Industry Benchmarks:
• 0-5 years experience: $[RANGE]
• 5-10 years experience: $[RANGE]
• 10-15 years experience: $[RANGE]
• 15+ years experience: $[RANGE]
• Your bracket: Top 2% for experience level

GEOGRAPHIC CONSIDERATIONS

Location: [CITY, STATE]
Cost of Living Index: [NUMBER]
Adjusted National Comparison: $[AMOUNT]
Local Market Premium: [X]% above local average

Regional Analysis:
[REGION] Average: $[AMOUNT]
Major Metropolitan Average: $[AMOUNT]
Your Compensation: [X]% above regional high

EXPERT VALIDATION

Independent Compensation Analysis by [CONSULTING FIRM]:
"The compensation package for [YOUR NAME] represents exceptional remuneration, 
placing them in the top 1% of [FIELD] professionals nationally. This level 
of compensation is typically reserved for individuals with extraordinary 
expertise and proven track record of exceptional performance."

- [EXPERT NAME], Senior Compensation Analyst

SUPPORTING DOCUMENTATION

• Form W-2 (3 years)
• Employment contract with compensation details
• Stock option grant agreements
• Performance bonus documentation
• Benefits summary statement
• Independent salary survey reports
• Government wage statistics
• Professional association survey data

CONCLUSION

The comprehensive evidence demonstrates that [YOUR NAME]'s compensation 
significantly exceeds industry standards, placing them in the top percentile 
of [FIELD] professionals. This exceptional remuneration reflects recognition 
of extraordinary ability and professional achievement.

───────────────────────────────────────────────────────────────────────────────
All salary data verified through multiple independent sources and adjusted 
for geographic and experience factors. Confidential information redacted 
for privacy protection.
      `
    },
    {
      id: 'support-letter',
      title: 'Independent Expert Support Letter',
      title_zh: '独立专家支持信',
      description: 'Template for strong recommendation letter from independent expert',
      description_zh: '独立专家强力推荐信模板',
      category: 'References',
      category_zh: '推荐',
      icon: UserGroupIcon,
      content: `
[EXPERT'S INSTITUTIONAL LETTERHEAD]

[DATE]

U.S. Citizenship and Immigration Services
[SERVICE CENTER ADDRESS]

Re: I-140 Petition for [YOUR NAME] - EB1A Extraordinary Ability

Dear Immigration Officers,

I am writing this letter in strong support of [YOUR NAME]'s petition for 
permanent residence under the EB-1A extraordinary ability category. I provide 
this recommendation based on my extensive knowledge of [YOUR NAME]'s exceptional 
contributions to [FIELD] and their sustained international acclaim.

EXPERT CREDENTIALS

I am [EXPERT NAME], [TITLE] at [INSTITUTION]. My qualifications include:
• Ph.D. in [FIELD] from [UNIVERSITY] (1995)
• [X] years of experience in [SPECIALTY]
• Author of [X] peer-reviewed publications
• Recipient of [MAJOR AWARDS]
• [CURRENT POSITION] since [YEAR]

My expertise specifically encompasses [RELEVANT AREAS], making me well-qualified 
to assess [YOUR NAME]'s contributions to the field.

INDEPENDENT RELATIONSHIP

I wish to clarify that my assessment is completely independent. I have never 
been employed by the same institution as [YOUR NAME], nor have we collaborated 
directly on research projects. My evaluation is based solely on:
• Review of [YOUR NAME]'s published work
• Assessment of their professional impact
• Industry recognition of their contributions
• Implementation of their innovations in my own work

EXTRAORDINARY ABILITY ASSESSMENT

Based on my [X] years in [FIELD], I can unequivocally state that [YOUR NAME] 
demonstrates extraordinary ability that places them among the top [X]% of 
professionals in our field.

Original Contributions of Major Significance:
[YOUR NAME]'s development of [INNOVATION] represents a paradigm shift in 
[AREA]. This contribution has:
• Solved long-standing challenges in [PROBLEM AREA]
• Been adopted by [X]+ organizations globally
• Generated measurable improvements of [X]% in [METRIC]
• Influenced [X]+ subsequent research projects

Personal Impact of Their Work:
Our organization has directly benefited from implementing [YOUR NAME]'s 
methodology, resulting in:
• [X]% improvement in operational efficiency
• $[AMOUNT] in cost savings annually
• Enhanced capabilities in [SPECIFIC AREA]

International Recognition:
The significance of [YOUR NAME]'s contributions is evidenced by:
• Citation in [X]+ countries
• Adoption by major corporations including [COMPANIES]
• Integration into academic curricula at [X]+ universities
• Recognition at international conferences

Comparison to Field Leaders:
In my professional opinion, [YOUR NAME]'s contributions rank among the most 
significant advances in [FIELD] in the past decade. The impact of their work 
is comparable to that of established leaders such as [RECOGNIZED EXPERTS], 
who are widely acknowledged as extraordinary talents in our field.

SPECIFIC ACHIEVEMENTS ASSESSMENT

Research Excellence:
• Publications in top-tier journals (Impact Factor [X]+)
• [X]+ citations with h-index of [X]
• Research methodology now considered industry standard

Innovation Impact:
• [INNOVATION NAME] adopted by [X]% of major industry players
• Licensed by [X]+ companies worldwide
• Featured in [X]+ technical standards

Professional Recognition:
• Invited speaker at [X]+ international conferences
• Editorial board member of [JOURNAL NAME]
• Consultant to [MAJOR ORGANIZATIONS]

INDUSTRY TRANSFORMATION

[YOUR NAME]'s work has fundamentally changed how professionals in [FIELD] 
approach [PROBLEM AREA]. Before their contributions, the field was limited by 
[PREVIOUS LIMITATIONS]. Their innovations have:
• Enabled new applications previously thought impossible
• Reduced costs by an average of [X]% across implementations
• Improved accuracy/efficiency by [X]%
• Opened new research directions explored by [X]+ research groups

SUSTAINED EXCELLENCE

What distinguishes [YOUR NAME] is not just individual achievements, but 
sustained excellence over [X] years. Their consistent production of high-impact 
work demonstrates the kind of extraordinary ability that EB-1A is designed 
to recognize.

Timeline of Major Contributions:
• [YEAR]: [MAJOR ACHIEVEMENT 1]
• [YEAR]: [MAJOR ACHIEVEMENT 2]
• [YEAR]: [MAJOR ACHIEVEMENT 3]
• [YEAR]: [CURRENT MAJOR PROJECT]

INTERNATIONAL ACCLAIM

The international recognition of [YOUR NAME]'s work is evidenced by:
• Invitations to speak in [X]+ countries
• Collaboration requests from [X]+ international institutions
• Implementation of their methods in [X]+ countries
• Translation of their work into [X]+ languages

CONCLUSION AND RECOMMENDATION

Based on my independent assessment as a recognized expert in [FIELD], I 
strongly recommend approval of [YOUR NAME]'s EB-1A petition. Their 
extraordinary ability is demonstrated through:
• Original contributions of major significance to the field
• Sustained international acclaim and recognition
• Documented impact on industry practices
• Continued leadership in advancing the field

[YOUR NAME] clearly meets and exceeds the criteria for extraordinary ability. 
The United States would greatly benefit from retaining such exceptional talent.

I am available to provide additional clarification if needed.

Sincerely,

[EXPERT SIGNATURE]

[EXPERT NAME], Ph.D.
[TITLE]
[INSTITUTION]
[ADDRESS]
[PHONE]
[EMAIL]

───────────────────────────────────────────────────────────────────────────────
Attachments:
• Expert's CV highlighting relevant credentials
• List of expert's major publications and awards
• Documentation of expert's standing in the field
      `
    },
    {
      id: 'academic-recommendation',
      title: 'Academic Supervisor Recommendation Letter',
      title_zh: '学术导师推荐信',
      description: 'Recommendation letter template from academic supervisor/professor',
      description_zh: '来自学术导师/教授的推荐信模板',
      category: 'References',
      category_zh: '推荐',
      icon: UserGroupIcon,
      content: `
[UNIVERSITY LETTERHEAD]

[DATE]

U.S. Citizenship and Immigration Services
[SERVICE CENTER ADDRESS]

Re: Strong Recommendation for [YOUR NAME] - EB1A Petition

Dear USCIS Officers,

I am writing this letter to provide my strongest possible recommendation for [YOUR NAME] 
in support of their EB-1A petition for permanent residence in the United States. As 
[TITLE] at [UNIVERSITY] and [YOUR NAME]'s [RELATIONSHIP - e.g., doctoral advisor, 
research collaborator], I have had the privilege of observing their extraordinary 
abilities firsthand over the past [X] years.

RECOMMENDER CREDENTIALS

I am [RECOMMENDER NAME], [TITLE] in the Department of [DEPARTMENT] at [UNIVERSITY]. 
My academic credentials include:
• Ph.D. in [FIELD] from [UNIVERSITY] ([YEAR])
• [X] years of research and teaching experience
• Author of [X]+ peer-reviewed publications
• Recipient of [MAJOR ACADEMIC AWARDS]
• [H-INDEX] with [X]+ citations
• Editorial board member of [JOURNALS]

My research expertise in [SPECIFIC AREAS] positions me well to evaluate [YOUR NAME]'s 
exceptional contributions to our field.

PROFESSIONAL RELATIONSHIP

I have known [YOUR NAME] since [YEAR] when they [CONTEXT - e.g., joined our research 
group, began their doctoral studies]. During this time, I have:
• Supervised their research on [RESEARCH TOPIC]
• Collaborated with them on [X] major projects
• Co-authored [X] publications together
• Observed their presentations at [X] conferences
• Witnessed their intellectual growth and impact

EXTRAORDINARY ABILITY ASSESSMENT

In my [X] years of academic experience, I have encountered very few individuals who 
demonstrate the level of extraordinary ability that [YOUR NAME] possesses. They 
consistently perform at a level that places them in the top [X]% of researchers 
in our field globally.

Research Excellence and Innovation:
[YOUR NAME]'s doctoral/postdoctoral research on [TOPIC] represents a significant 
breakthrough in [FIELD]. Their work has:
• Solved the long-standing problem of [SPECIFIC PROBLEM]
• Introduced novel methodologies that are now widely adopted
• Generated insights that have influenced [X]+ subsequent studies
• Been cited [X]+ times since publication

The significance of this work cannot be overstated. Before [YOUR NAME]'s contributions, 
the field was limited by [LIMITATIONS]. Their innovations have opened entirely new 
research directions.

Outstanding Academic Performance:
• Graduated [summa cum laude/with highest honors] from [UNIVERSITY]
• Achieved [GPA/RANKING] ranking in their graduating class
• Received [X] academic awards and fellowships
• Published [X] first-author papers in top-tier journals (Impact Factor [X]+)

Leadership in Research Community:
Despite their relatively early career stage, [YOUR NAME] has already demonstrated 
remarkable leadership:
• Invited speaker at [X] international conferences
• Organized [WORKSHOP/SESSION] at [CONFERENCE]
• Serves as reviewer for [X] prestigious journals
• Mentors [X] junior researchers

SPECIFIC ACHIEVEMENTS THAT DEMONSTRATE EXTRAORDINARY ABILITY

Original Contributions of Major Significance:
1. [CONTRIBUTION 1]: This work, published in [JOURNAL], has been cited [X] times 
   and has become a foundational reference in [SUBFIELD].

2. [CONTRIBUTION 2]: The algorithm/method developed by [YOUR NAME] has been 
   implemented by [X]+ research groups worldwide and is now considered the 
   standard approach for [PROBLEM TYPE].

3. [CONTRIBUTION 3]: Their theoretical framework for [CONCEPT] has influenced 
   how the entire field approaches [PROBLEM AREA].

International Recognition:
• Work featured in [X] international media outlets
• Invited presentations in [X] countries
• Collaboration requests from [X] international institutions
• Methods adopted by researchers across [X] continents

Awards and Honors Reflecting Extraordinary Achievement:
• [AWARD NAME] ([YEAR]) - Given to top [X]% of [PROFESSION]
• [FELLOWSHIP NAME] ([YEAR]) - [X] recipients selected from [X]+ applicants
• [RECOGNITION] ([YEAR]) - For outstanding contribution to [FIELD]

COMPARISON WITH FIELD LEADERS

To provide context for [YOUR NAME]'s achievements, I can compare them to established 
leaders in our field:

• Their citation rate exceeds that of [X]% of tenured professors in our department
• Their h-index of [X] is comparable to researchers with [X]+ years of experience
• The impact of their work rivals that of [ESTABLISHED RESEARCHER NAME], who is 
  recognized as a pioneer in [AREA]

In terms of innovation and originality, [YOUR NAME]'s contributions are among the 
most significant I have witnessed in my career.

SUSTAINED EXCELLENCE AND FUTURE POTENTIAL

What sets [YOUR NAME] apart is not just individual achievements, but their 
consistent pattern of excellence and continued productivity:

Publication Record:
• [X] publications in the past [X] years
• Average journal impact factor of [X]
• [X]% of papers published in top-tier venues
• Consistent upward trajectory in citation impact

Ongoing Projects:
[YOUR NAME] is currently leading [X] major research initiatives that promise to 
further advance the field:
• [PROJECT 1]: Expected to [IMPACT]
• [PROJECT 2]: Collaboration with [INSTITUTION/COMPANY]
• [PROJECT 3]: Addressing critical challenge of [PROBLEM]

IMPACT ON FIELD AND SOCIETY

[YOUR NAME]'s work extends beyond academic achievement to create real-world impact:

Practical Applications:
• Their algorithms are used in [X]+ commercial products
• Methods implemented in [X] countries for [APPLICATION]
• Estimated economic impact of $[AMOUNT] annually

Educational Influence:
• Research incorporated into curricula at [X]+ universities
• Textbook chapter dedicated to their contributions
• [X]+ students trained using their methodologies

RECOMMENDATION FOR EB1A APPROVAL

Based on my assessment as a senior academic with [X] years of experience evaluating 
researchers, I strongly recommend approval of [YOUR NAME]'s EB-1A petition. They 
clearly demonstrate:

1. Extraordinary ability through consistently outstanding research
2. Sustained international acclaim evidenced by citations and invitations
3. Original contributions of major significance to the field
4. Recognition from peers at the highest levels

The United States would greatly benefit from [YOUR NAME]'s continued presence. Their 
research addresses critical challenges in [FIELD] and has direct applications to 
[SOCIETAL BENEFITS].

I am confident that [YOUR NAME] will continue to make extraordinary contributions 
and maintain their position among the world's leading researchers in [FIELD].

I am available to discuss this recommendation further if additional information 
would be helpful.

Sincerely,

[SIGNATURE]

[RECOMMENDER NAME], Ph.D.
[TITLE]
[DEPARTMENT]
[UNIVERSITY]
[ADDRESS]
[PHONE]
[EMAIL]

───────────────────────────────────────────────────────────────────────────────
Attachments:
• Recommender's detailed CV
• List of recommender's publications and citations
• Evidence of recommender's standing in academic community
• Documentation of specific collaborations with petitioner
      `
    },
    {
      id: 'industry-recommendation',
      title: 'Industry Leader Recommendation Letter',
      title_zh: '行业领袖推荐信',
      description: 'Recommendation letter from industry executive or senior professional',
      description_zh: '来自行业高管或资深专业人士的推荐信',
      category: 'References',
      category_zh: '推荐',
      icon: UserGroupIcon,
      content: `
[COMPANY LETTERHEAD]

[DATE]

U.S. Citizenship and Immigration Services
[SERVICE CENTER ADDRESS]

Subject: Strong Professional Recommendation for [YOUR NAME] - EB1A Extraordinary Ability Petition

Dear Immigration Officers,

As [TITLE] of [COMPANY], one of the leading organizations in [INDUSTRY], I am writing 
to provide my strongest professional recommendation for [YOUR NAME] in support of 
their EB-1A petition. Based on my [X] years of industry experience and direct 
knowledge of [YOUR NAME]'s exceptional contributions, I can confidently attest to 
their extraordinary ability in [FIELD].

RECOMMENDER BACKGROUND AND CREDENTIALS

I am [RECOMMENDER NAME], [TITLE] at [COMPANY], where I have served for [X] years. 
My professional background includes:
• [X] years of executive leadership in [INDUSTRY]
• Previously held senior positions at [PREVIOUS COMPANIES]
• [EDUCATION] from [INSTITUTION]
• Recognized industry expert in [SPECIALIZATION]
• Board member of [PROFESSIONAL ORGANIZATIONS]
• Speaker at [X]+ industry conferences annually

[COMPANY] is a [DESCRIPTION] company with [X]+ employees and annual revenue of 
$[AMOUNT], serving clients in [X]+ countries. We are recognized as an industry 
leader and our assessments carry significant weight in the professional community.

PROFESSIONAL RELATIONSHIP WITH PETITIONER

I have known [YOUR NAME] professionally since [YEAR] through [CONTEXT]. Our 
interactions have included:
• Collaboration on [PROJECT/INITIATIVE]
• Their consultation on [TECHNICAL CHALLENGE]
• Joint participation in [INDUSTRY EVENT/COMMITTEE]
• Implementation of their innovations in our operations

This relationship has given me detailed insight into [YOUR NAME]'s exceptional 
capabilities and industry impact.

ASSESSMENT OF EXTRAORDINARY ABILITY

In my [X] years in [INDUSTRY], I have worked with hundreds of professionals, 
including many with advanced degrees and significant experience. [YOUR NAME] 
stands out as one of the most extraordinary talents I have encountered, 
demonstrating abilities that place them among the top [X]% of professionals 
in our field.

Innovation and Problem-Solving Excellence:
[YOUR NAME]'s approach to [SPECIFIC AREA] has revolutionized how our industry 
addresses [PROBLEM TYPE]. Their development of [INNOVATION] has:
• Reduced operational costs industry-wide by an average of [X]%
• Improved efficiency metrics by [X]% across implementations
• Enabled new capabilities previously thought impossible
• Been adopted by [X]+ major companies globally

Technical Leadership:
• Recognized as the foremost expert in [SPECIALIZATION]
• Consulted by [X]+ Fortune 500 companies on [TECHNICAL AREA]
• Their methodologies now taught in [X]+ business schools
• Patents granted for [X] innovative solutions

SPECIFIC CONTRIBUTIONS TO INDUSTRY

Direct Impact on Our Organization:
Our implementation of [YOUR NAME]'s [SOLUTION/METHOD] has resulted in:
• Annual cost savings of $[AMOUNT]
• [X]% improvement in [METRIC]
• Enhanced competitive position in [MARKET SEGMENT]
• New revenue opportunities worth $[AMOUNT]

Industry-Wide Transformation:
[YOUR NAME]'s contributions have fundamentally changed industry practices:

1. [CONTRIBUTION 1]: Their work on [TOPIC] has become the industry standard, 
   adopted by [X]+ organizations including [MAJOR COMPANIES].

2. [CONTRIBUTION 2]: The framework they developed for [PROCESS] has improved 
   industry-wide performance by measurable margins.

3. [CONTRIBUTION 3]: Their insights into [AREA] have influenced regulatory 
   standards and best practices globally.

INTERNATIONAL RECOGNITION AND ACCLAIM

Professional Standing:
• Keynote speaker at [X] international industry conferences
• Invited expert at [MAJOR INDUSTRY EVENTS]
• Quoted as industry authority in [X]+ major publications
• Serves on advisory boards of [X] organizations

Global Influence:
• Their work implemented across [X] countries
• Consulting engagements with [INTERNATIONAL COMPANIES]
• Recognition from [INTERNATIONAL INDUSTRY BODIES]
• Methods translated and adapted for [X] different markets

Awards and Professional Recognition:
• [INDUSTRY AWARD] ([YEAR]) - [DESCRIPTION OF SIGNIFICANCE]
• [PROFESSIONAL RECOGNITION] ([YEAR]) - [SELECTION CRITERIA]
• [LEADERSHIP AWARD] ([YEAR]) - [NUMBER OF RECIPIENTS]

SUSTAINED EXCELLENCE AND PRODUCTIVITY

Career Trajectory Demonstrating Extraordinary Ability:
[YEAR]: [EARLY ACHIEVEMENT]
[YEAR]: [MAJOR BREAKTHROUGH]
[YEAR]: [INDUSTRY RECOGNITION]
[YEAR]: [CURRENT LEADERSHIP ROLE]

This progression demonstrates not just individual achievements, but sustained 
excellence that characterizes extraordinary ability.

Current Industry Leadership:
• Leading [X] major industry initiatives
• Mentoring [X] senior professionals
• Driving innovation in [EMERGING AREAS]
• Shaping future direction of [INDUSTRY SEGMENT]

COMPARISON WITH INDUSTRY LEADERS

To provide proper context, I can compare [YOUR NAME]'s achievements with other 
recognized industry leaders:

• Their innovation impact rivals that of [ESTABLISHED INDUSTRY LEADER]
• Professional recognition comparable to [INDUSTRY PIONEER]
• Rate of breakthrough contributions exceeds industry averages by [X]%
• Influence on industry practices matches that of [TOP PROFESSIONAL]

In my assessment, [YOUR NAME] represents the caliber of extraordinary talent that 
drives industry evolution and maintains competitive advantage.

CRITICAL ROLE AND HIGH REMUNERATION

Leadership Responsibilities:
[YOUR NAME] currently serves in critical roles that demonstrate their extraordinary 
value:
• [LEADERSHIP POSITION] at [ORGANIZATION]
• Responsible for [X]+ person team and $[BUDGET]
• Strategic oversight of [CRITICAL FUNCTION]
• Decision authority for [MAJOR INITIATIVES]

Professional Compensation:
Based on industry knowledge, [YOUR NAME]'s compensation is in the top [X]% for 
professionals in [FIELD], reflecting market recognition of their extraordinary value.

RECOMMENDATION AND CONCLUSION

Based on my professional assessment and industry experience, I strongly recommend 
approval of [YOUR NAME]'s EB-1A petition. They demonstrate extraordinary ability through:

1. Sustained record of innovation and industry leadership
2. International recognition and acclaim from professional peers
3. Original contributions that have transformed industry practices
4. Critical role in major organizations with distinguished reputations
5. Compensation reflecting their extraordinary value to the field

The United States would greatly benefit from retaining such exceptional industry 
talent. [YOUR NAME]'s continued presence will contribute to American competitiveness 
in [INDUSTRY] and drive continued innovation.

I am available to provide additional information or clarification as needed.

Best regards,

[SIGNATURE]

[RECOMMENDER NAME]
[TITLE]
[COMPANY]
[ADDRESS]
[PHONE]
[EMAIL]

───────────────────────────────────────────────────────────────────────────────
Attachments:
• Detailed company profile and industry standing
• Recommender's professional biography and achievements
• Documentation of specific collaborations and results
• Industry reports citing petitioner's contributions
      `
    },
    {
      id: 'international-expert-recommendation',
      title: 'International Expert Recommendation Letter',
      title_zh: '国际专家推荐信',
      description: 'Recommendation from internationally recognized expert in the field',
      description_zh: '来自该领域国际知名专家的推荐信',
      category: 'References',
      category_zh: '推荐',
      icon: UserGroupIcon,
      content: `
[INSTITUTIONAL LETTERHEAD]

[DATE]

United States Citizenship and Immigration Services
[SERVICE CENTER ADDRESS]

RE: Expert Recommendation for [YOUR NAME] - EB1A Extraordinary Ability Classification

Distinguished Officers,

I am honored to provide this expert recommendation for [YOUR NAME] in support of 
their EB-1A petition for permanent residence in the United States. As an internationally 
recognized authority in [FIELD] with extensive global perspective, I can attest to 
[YOUR NAME]'s extraordinary ability and their standing among the world's leading 
professionals in our field.

EXPERT CREDENTIALS AND INTERNATIONAL STANDING

I am [EXPERT NAME], [TITLE] at [INSTITUTION] in [COUNTRY]. My international 
credentials include:
• [ADVANCED DEGREE] from [PRESTIGIOUS UNIVERSITY] ([YEAR])
• [X] years of international research and professional experience
• [X]+ publications in leading international journals
• Collaborations with institutions in [X]+ countries
• [H-INDEX] with [X]+ citations from researchers worldwide
• Fellow of [INTERNATIONAL PROFESSIONAL SOCIETIES]
• Recipient of [INTERNATIONAL AWARDS/HONORS]

Professional Recognition:
• Editorial board member of [X] international journals
• Keynote speaker at [X]+ international conferences annually
• Consultant to [INTERNATIONAL ORGANIZATIONS]
• Expert advisor to [GOVERNMENT AGENCIES/INTERNATIONAL BODIES]

GLOBAL PERSPECTIVE ON THE FIELD

My international experience positions me uniquely to assess [YOUR NAME]'s global 
standing. I maintain active collaborations with leading researchers and institutions 
across [X] continents, including:
• [INSTITUTION 1] in [COUNTRY]
• [INSTITUTION 2] in [COUNTRY]
• [INSTITUTION 3] in [COUNTRY]
• [MAJOR COMPANIES] in [COUNTRIES]

This global network provides me with comprehensive insight into international 
standards of excellence and the relative standing of professionals worldwide.

RELATIONSHIP WITH PETITIONER

I became aware of [YOUR NAME]'s work in [YEAR] through [CONTEXT - e.g., their 
publication in [JOURNAL], presentation at [CONFERENCE]]. Since then, I have:
• Followed their research developments closely
• Cited their work in [X] of my publications
• Invited them to speak at [INTERNATIONAL EVENT]
• Implemented their methodologies in my research
• Collaborated on [PROJECT/INITIATIVE]

Importantly, this relationship is based purely on professional merit and mutual 
research interests, providing an independent assessment of their capabilities.

ASSESSMENT OF EXTRAORDINARY ABILITY FROM INTERNATIONAL PERSPECTIVE

Based on my global view of the field, [YOUR NAME] demonstrates extraordinary ability 
that places them among the top [X]% of professionals worldwide in [FIELD]. This 
assessment is based on internationally recognized criteria of excellence.

International Impact and Recognition:
[YOUR NAME]'s contributions have achieved global significance:
• Research cited by scholars in [X]+ countries
• Methods implemented across [X] continents
• Invited presentations at major international conferences in [COUNTRIES]
• Collaboration requests from [X]+ international institutions
• Work featured in international media and trade publications

Comparison with International Standards:
In my assessment of professionals across [X] countries, [YOUR NAME]'s achievements 
rank among the most significant:
• Publication record exceeds international benchmarks for excellence
• Citation impact comparable to established leaders from [PRESTIGIOUS INSTITUTIONS]
• Innovation rate and significance matches top researchers globally
• Professional recognition spans multiple countries and cultural contexts

SPECIFIC CONTRIBUTIONS WITH INTERNATIONAL SIGNIFICANCE

Breakthrough Research with Global Impact:
1. [CONTRIBUTION 1]: This work, published in [INTERNATIONAL JOURNAL], has been 
   translated into [X] languages and implemented by organizations in [X] countries.

2. [CONTRIBUTION 2]: The methodology developed by [YOUR NAME] has become the 
   international standard, adopted by [INTERNATIONAL ORGANIZATIONS] and taught 
   in universities across [X] continents.

3. [CONTRIBUTION 3]: Their theoretical framework has influenced international 
   standards and practices, with formal adoption by [INTERNATIONAL BODIES].

Cross-Cultural Professional Excellence:
• Successful presentations to diverse international audiences
• Collaborative work with professionals from [X] different cultural backgrounds
• Adaptation of solutions for various international contexts
• Recognition from international professional organizations

INTERNATIONAL AWARDS AND HONORS

[YOUR NAME] has received recognition from international bodies that demonstrates 
extraordinary ability on a global scale:

• [INTERNATIONAL AWARD] ([YEAR]): [DESCRIPTION AND SIGNIFICANCE]
  - Selected from [X]+ international nominees
  - Previous recipients include [NOTABLE FIGURES]
  - Recognition criteria: [STANDARDS FOR EXTRAORDINARY ACHIEVEMENT]

• [GLOBAL RECOGNITION] ([YEAR]): [DESCRIPTION]
  - [X] recipients selected annually worldwide
  - Represents top [X]% of professionals globally

• [INTERNATIONAL FELLOWSHIP] ([YEAR]): [DESCRIPTION]
  - Membership limited to [X] individuals globally
  - Selection based on extraordinary contributions to the field

SUSTAINED INTERNATIONAL INFLUENCE

Ongoing Global Leadership:
[YOUR NAME] continues to demonstrate extraordinary ability through sustained 
international influence:
• Advisory roles with [INTERNATIONAL ORGANIZATIONS]
• Editorial responsibilities for [GLOBAL PUBLICATIONS]
• Steering committee member for [INTERNATIONAL INITIATIVES]
• Mentor to emerging professionals across [X] countries

Future International Impact:
Current projects position [YOUR NAME] for continued global influence:
• [PROJECT 1]: International consortium involving [X] countries
• [PROJECT 2]: Global implementation expected in [X]+ regions
• [PROJECT 3]: Collaboration with [INTERNATIONAL INSTITUTION]

COMPARATIVE ANALYSIS WITH GLOBAL LEADERS

To provide proper perspective, I can compare [YOUR NAME] with internationally 
recognized leaders in our field:

Research Impact:
• Citation rate comparable to [INTERNATIONAL LEADER 1] from [COUNTRY]
• Innovation significance matches [INTERNATIONAL LEADER 2] from [COUNTRY]
• Global influence rivals [INTERNATIONAL LEADER 3] from [COUNTRY]

Professional Standing:
• International speaking invitations equal to top researchers globally
• Cross-cultural collaborative success exceeds typical patterns
• Global network and influence span [X] countries

Recognition Pattern:
• Award timeline comparable to established international leaders
• Selection for honors matches pattern of extraordinary achievers
• International visibility appropriate for top [X]% of field

INTERNATIONAL PERSPECTIVE ON US BENEFIT

From an international viewpoint, the United States would gain significant advantage 
by retaining [YOUR NAME]:

Global Competitiveness:
• Their expertise maintains US leadership in [FIELD]
• Innovation contributions keep US standards at international forefront
• Collaborative networks enhance US international research relationships

International Collaboration:
• [YOUR NAME] serves as bridge between US and international research communities
• Their presence facilitates beneficial international partnerships
• Global recognition enhances US reputation in [FIELD]

Knowledge Transfer:
• International best practices brought to US institutions
• Cross-cultural insights enhance US approaches
• Global perspective enriches US research and development

STRONG RECOMMENDATION FOR APPROVAL

Based on my international expertise and global perspective on the field, I provide 
my strongest recommendation for approval of [YOUR NAME]'s EB-1A petition. From an 
international standpoint, they clearly demonstrate:

1. Extraordinary ability recognized globally across multiple countries
2. Sustained international acclaim evidenced by cross-cultural recognition
3. Original contributions with documented worldwide impact
4. Standing among international leaders in the field
5. Continued potential for global influence and US benefit

The extraordinary ability standard should be assessed against international benchmarks, 
and by these measures, [YOUR NAME] clearly qualifies. The United States would greatly 
benefit from their continued presence and contributions.

I am available for additional consultation to provide further international perspective 
on this exceptional candidate.

Respectfully submitted,

[SIGNATURE]

[EXPERT NAME], [DEGREE]
[TITLE]
[INSTITUTION]
[COUNTRY]
[PHONE]
[EMAIL]

───────────────────────────────────────────────────────────────────────────────
International Credentials Documentation:
• Complete CV with international experience details
• List of international collaborations and projects
• Documentation of global professional standing
• International awards and recognition certificates
      `
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', name_zh: '所有类别' },
    { id: 'Awards', name: 'Awards', name_zh: '奖项' },
    { id: 'Associations', name: 'Associations', name_zh: '协会' },
    { id: 'Media', name: 'Media Coverage', name_zh: '媒体报道' },
    { id: 'Judging', name: 'Judging Work', name_zh: '评判工作' },
    { id: 'Contributions', name: 'Original Contributions', name_zh: '原创贡献' },
    { id: 'Publications', name: 'Scholarly Articles', name_zh: '学术文章' },
    { id: 'Leadership', name: 'Leadership Roles', name_zh: '领导角色' },
    { id: 'Salary', name: 'High Remuneration', name_zh: '高薪酬' },
    { id: 'References', name: 'Support Letters', name_zh: '支持信' }
  ];

  const filteredMaterials = selectedCategory === 'all' 
    ? mockMaterials 
    : mockMaterials.filter(material => material.category === selectedCategory);

  const downloadMaterial = (material: MockMaterial) => {
    const element = document.createElement('a');
    const file = new Blob([material.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${material.id}-template.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {getText('EB1A Mock Materials Generator', 'EB1A模拟材料生成器')}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {getText(
            'Generate realistic sample documents and templates for your EB1A petition',
            '为您的EB1A申请生成逼真的示例文档和模板'
          )}
        </p>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {getText('Filter by Category', '按类别筛选')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {getText(category.name, category.name_zh)}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material) => {
          const Icon = material.icon;
          
          return (
            <div
              key={material.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {getText(material.title, material.title_zh)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {getText(material.description, material.description_zh)}
                  </p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {getText(material.category, material.category_zh)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setSelectedMaterial(material)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {getText('Preview', '预览')}
                </button>
                <button
                  onClick={() => downloadMaterial(material)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowDownTrayIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Material Preview Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedMaterial(null)} />
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        {getText(selectedMaterial.title, selectedMaterial.title_zh)}
                      </h3>
                      <button
                        onClick={() => setSelectedMaterial(null)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-mono">
                        {selectedMaterial.content}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={() => downloadMaterial(selectedMaterial)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  {getText('Download Template', '下载模板')}
                </button>
                <button
                  onClick={() => setSelectedMaterial(null)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {getText('Close', '关闭')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-4">
          {getText('Important Usage Notes', '重要使用说明')}
        </h3>
        <div className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
          <p>
            {getText(
              '• These are TEMPLATE EXAMPLES only - you must customize all content with your actual information',
              '• 这些仅为模板示例 - 您必须用实际信息自定义所有内容'
            )}
          </p>
          <p>
            {getText(
              '• Replace all bracketed placeholders [YOUR NAME], [YOUR FIELD], etc. with your specific details',
              '• 用您的具体详细信息替换所有方括号占位符 [您的姓名]、[您的领域] 等'
            )}
          </p>
          <p>
            {getText(
              '• Ensure all information is accurate and can be verified with supporting documentation',
              '• 确保所有信息准确无误且可通过支持文档验证'
            )}
          </p>
          <p>
            {getText(
              '• Consult with an immigration attorney for professional guidance on your specific case',
              '• 就您的具体情况咨询移民律师的专业指导'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}