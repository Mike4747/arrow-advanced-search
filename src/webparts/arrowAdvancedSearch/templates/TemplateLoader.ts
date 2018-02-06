import { ITemplates } from '../utils/ITemplates';

export const allTemplates: ITemplates[] = [
   // { key: 'Defaulttemplate', text: 'Default template', mappings: 'Path,Title,HitHighlightedSummary,Filename,Fileextension,LinktoContent,LinktoContentOWSTEXT,Link_x0020_to_x0020_Content' },
   { key: 'TableTemplateAll', text: 'All Sites-Search Anything', mappings: 'Path,Title,Filename,Fileextension,ModifiedOWSDATE,EditorOWSUSER,HitHighlightedSummary,DocumentDescriptionOWSTEXT' },
   { key: 'TableTemplatePeople', text: 'All Sites-Search People', mappings: 'Path,Title,Filename,Fileextension,ModifiedOWSDATE,EditorOWSUSER,HitHighlightedSummary,DocumentDescriptionOWSTEXT' },
   { key: 'TableTemplate', text: 'GES Only-Search Governance', mappings: 'Path,Title,Filename,Fileextension,ModifiedOWSDATE,EditorOWSUSER,HitHighlightedSummary,DocumentDescriptionOWSTEXT' },
    { key: 'TableTemplateList', text: 'GES Only-Search Knowledge', mappings: 'Path,Title,Filename,Fileextension,LinktoContentOWSTEXT,ContentLinkOWSTEXT,ContentDescriptionOWSTEXT' }

];

export default class TemplateLoader {
    public getComponent(templateToLoad: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const component: any = require("../templates/" + templateToLoad + ".js");
            resolve(component.default);
        });
    }

    public getTemplateMappings(templateToLoad: string): string {
        // Retrieve the fields for the current template
		const fields: ITemplates[] = allTemplates.filter((t) => { if (t.key === templateToLoad) return true; });
		return fields.length > 0 ? fields[0].mappings : "";
    }
}