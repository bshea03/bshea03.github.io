export type Project = {
  title: string;
  description: string;
  details: {
    intro: string;
    features: [
      {
        title: string;
        description: string;
      },
    ];
    conclusion: string;
  };
  image: string;
  alt?: string;
  tech: Array<string>;
  docs?: string;
  code?: string;
};
