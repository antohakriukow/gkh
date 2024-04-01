import { lazy } from 'react'

const AnnualReports = lazy(
	() => import('~/components/screens/annual-reports/AnnualReports')
)
const FAQ = lazy(() => import('~/components/screens/faq/FAQ'))
const Issues = lazy(() => import('~/components/screens/issues/Issues'))
const Prices = lazy(() => import('~/components/screens/prices/Prices'))
const ReportEditor = lazy(
	() => import('~/components/screens/report/ReportEditor')
)
const Reports = lazy(() => import('~/components/screens/reports/Reports'))
const AccrualsSetter = lazy(
	() =>
		import('~/components/screens/annual-report/accruals-setter/AccrualsSetter')
)
const CategoriesSetter = lazy(
	() =>
		import(
			'~/components/screens/annual-report/categories-setter/CategoriesSetter'
		)
)
const CreditSorter = lazy(
	() => import('~/components/screens/annual-report/credit-sorter/CreditSorter')
)
const DataUploader = lazy(
	() => import('~/components/screens/annual-report/data-uploader/DataUploader')
)
const DebitSorter = lazy(
	() => import('~/components/screens/annual-report/debit-sorter/DebitSorter')
)
const Preview = lazy(
	() => import('~/components/screens/annual-report/preview/Preview')
)

export const protectedRoutesMap = [
	{ path: '/reports', component: Reports },
	{ path: '/reports/edit/:reportId', component: ReportEditor },
	{ path: '/annual-reports', component: AnnualReports },
	{
		path: '/annual-reports/edit/:reportId/data-uploader',
		component: DataUploader
	},
	{
		path: '/annual-reports/edit/:reportId/categories-setter',
		component: CategoriesSetter
	},
	{
		path: '/annual-reports/edit/:reportId/accruals-setter',
		component: AccrualsSetter
	},
	{
		path: '/annual-reports/edit/:reportId/credit-sorter',
		component: CreditSorter
	},
	{
		path: '/annual-reports/edit/:reportId/debit-sorter',
		component: DebitSorter
	},
	{ path: '/annual-reports/edit/:reportId/preview', component: Preview },
	{ path: '/issues', component: Issues },
	{ path: '/faq', component: FAQ },
	{ path: '/prices', component: Prices }
]
