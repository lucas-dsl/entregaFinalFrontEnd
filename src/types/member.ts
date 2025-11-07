export interface MemberLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface Member {
  name: string;
  role: string;
  rm: string;
  turma: string;
  bio: string;
  image: string;
  links: MemberLinks;
}
