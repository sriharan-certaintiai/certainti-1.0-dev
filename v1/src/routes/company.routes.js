const { Router } = require("express");
const { createCompany,
        getCompanyList,
        getCompanyKPIs,
        getDetailsByCompany,
        getContactsByCompany,
        getProjectsByCompany,
        getCompanyHighlights,
        editCompany,
        getCompanyCurrency,
        triggerAi,
        toggleAutoInteractions,
        getCompanyFilterValues,
        getCCEmails,
        updateCCEmails,
        getCountryData
} = require("../controllers/company.controller.js");
const authorize = require("../middlewares/auth.middleware.js");
const { authorize_jwt } = require("../middlewares/auth.middleware_jwt.js");
const companyRouter = Router()

//meta data api
companyRouter.get('/get-country-data', authorize_jwt, getCountryData);

companyRouter.post("/:user/create-company", authorize_jwt, authorize('client', 'create'), createCompany);
companyRouter.get("/:user/get-companys-filter-values", authorize_jwt, getCompanyFilterValues);
companyRouter.get("/:user/get-company-list", authorize_jwt, getCompanyList);
companyRouter.get("/:user/:company/get-company-kpi", authorize_jwt, getCompanyKPIs);
companyRouter.get("/:user/:company/get-company-details", authorize_jwt, getDetailsByCompany);
companyRouter.get("/:user/:company/get-contacts-by-company", authorize_jwt, getContactsByCompany);
companyRouter.get("/:user/:company/get-projects-by-company", authorize_jwt, getProjectsByCompany);
companyRouter.get("/:user/:company/get-highlights", authorize_jwt, getCompanyHighlights);
companyRouter.put("/:user/:company/edit-company", authorize_jwt, authorize('client', 'update'), editCompany);
companyRouter.get("/:user/:companyId/get-currency", authorize_jwt, getCompanyCurrency);
companyRouter.post("/:companyId/trigger-ai", authorize_jwt, triggerAi);
companyRouter.post("/:companyId/:toggle/toggle-auto-interactions", authorize_jwt, toggleAutoInteractions);

// ccmails
companyRouter.get("/:companyId/ccmails", authorize_jwt, getCCEmails);
companyRouter.put("/:companyId/update-ccmails", authorize_jwt, updateCCEmails);


module.exports = companyRouter
