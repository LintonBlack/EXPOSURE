import { ProjectVPage } from './app.po';

describe('project-v App', () => {
  let page: ProjectVPage;

  beforeEach(() => {
    page = new ProjectVPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
