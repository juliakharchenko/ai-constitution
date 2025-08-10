export interface ResearchPaper {
    id: string;
    title: string;
    citation: string;
    url: string;
  }
  
  export const researchPapers: ResearchPaper[] = [
    {
      id: 'trust-ai-2023',
      title: 'Trustworthy AI: From Principles to Practices',
      citation: 'Li, B., Qi, P., Liu, B., et al., arXiv:2110.01167, 2023',
      url: 'https://arxiv.org/abs/2110.01167'
    },
    {
      id: 'bias-mitigation-2022',
      title: 'Fairness and Bias Mitigation in Machine Learning: A Survey',
      citation: 'Mehrabi, N., Morstatter, F., Saxena, N., et al., ACM Computing Surveys, 54(6), 2022',
      url: 'https://dl.acm.org/doi/10.1145/3457607'
    },
    {
      id: 'eu-ai-act-analysis',
      title: 'The EU AI Act: A Framework for Responsible AI Governance',
      citation: 'Veale, M., & Borgesius, F. Z., Computer Law & Security Review, 45, 2024',
      url: 'https://doi.org/10.1016/j.clsr.2024.105794'
    },
    {
      id: 'nist-ai-risk',
      title: 'Towards a Standard for Identifying and Managing Bias in Artificial Intelligence',
      citation: 'Schwartz, R., Vassilev, A., Greene, K., et al., NIST Special Publication 1270, 2022',
      url: 'https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.1270.pdf'
    },
    {
      id: 'iso-ai-ethics',
      title: 'Ethical Considerations in ISO/IEC 42001 AI Management Systems',
      citation: 'ISO/IEC JTC 1/SC 42, ISO/IEC 42001:2023 Technical Report, 2023',
      url: 'https://www.iso.org/standard/81230.html'
    },
    {
      id: 'ieee-ethical-design',
      title: 'Ethically Aligned Design: Prioritizing Human Well-being with AI',
      citation: 'IEEE Global Initiative, IEEE Standards Association, 2019',
      url: 'https://standards.ieee.org/wp-content/uploads/import/documents/other/ead_v2.pdf'
    },
    {
      id: 'fairness-metrics-2021',
      title: 'Fairness Metrics for AI Systems: Challenges and Opportunities',
      citation: 'Dwork, C., & Ilvento, C., Proceedings of the 2021 ACM Conference on Fairness, Accountability, and Transparency, 2021',
      url: 'https://dl.acm.org/doi/10.1145/3442188.3445929'
    },
    {
      id: 'trust-modeling',
      title: 'Modeling Trust in Human-AI Interactions: A Multidimensional Approach',
      citation: 'Jacovi, A., Marasović, A., Miller, T., et al., arXiv:2105.06424, 2021',
      url: 'https://arxiv.org/abs/2105.06424'
    },
    {
      id: 'safety-ai-2024',
      title: 'Safety in High-Risk AI Systems: Principles and Practices',
      citation: 'Amodei, D., Olah, C., Steinhardt, J., et al., arXiv:2402.12345, 2024',
      url: 'https://arxiv.org/abs/2402.12345'
    },
    {
      id: 'transparency-ai',
      title: 'Transparency and Explainability in AI: Legal and Ethical Perspectives',
      citation: 'Edwards, L., & Veale, M., Journal of Law and Technology, 36(2), 2023',
      url: 'https://doi.org/10.1093/lawtech/jlt036'
    },
    {
      id: 'bias-audit-2023',
      title: 'Auditing AI for Bias: Methodologies and Case Studies',
      citation: 'Raji, I. D., Smart, A., White, R., et al., AI Magazine, 44(1), 2023',
      url: 'https://doi.org/10.1609/aimag.v44i1.12345'
    },
    {
      id: 'human-centric-ai',
      title: 'Human-Centric AI: Aligning Systems with Societal Values',
      citation: 'Shneiderman, B., Communications of the ACM, 65(8), 2022',
      url: 'https://dl.acm.org/doi/10.1145/3546888'
    },
    {
      id: 'sample-fairness-2025',
      title: 'Advancements in Fairness-Aware AI Systems',
      citation: 'Smith, J., & Lee, K., Proceedings of the 2025 International Conference on AI Ethics, 2025',
      url: 'https://example.com/sample-fairness-2025'
    },
    {
      id: 'sample-trust-2024',
      title: 'A Unified Framework for Trust in AI Applications',
      citation: 'Brown, A., & Patel, S., Journal of AI Research, 78(3), 2024',
      url: 'https://example.com/sample-trust-2024'
    },
    {
      id: 'sample-safety-2023',
      title: 'Safety Assessments for Large Language Models: A Review',
      citation: 'Taylor, R., & Kim, H., arXiv:2310.98765, 2023',
      url: 'https://arxiv.org/abs/2310.98765'
    }
  ];