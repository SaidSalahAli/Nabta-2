import lazyRetry from 'utils/lazyRetry';

// project-imports
import Loadable from 'components/Loadable';
import RouteErrorBoundary from 'components/RouteErrorBoundary';
import { SimpleLayoutType } from 'config';
import DashboardLayout from 'layout/Dashboard';
import PagesLayout from 'layout/Pages';
import SimpleLayout from 'layout/Simple';
import AuthGuard from 'utils/route-guard/AuthGuard';

// pages routing
const MaintenanceError = Loadable(lazyRetry(() => import('pages/maintenance/error/404')));
const MaintenanceError500 = Loadable(lazyRetry(() => import('pages/maintenance/error/500')));
const MaintenanceUnderConstruction = Loadable(lazyRetry(() => import('pages/maintenance/under-construction/under-construction')));
const MaintenanceUnderConstruction2 = Loadable(lazyRetry(() => import('pages/maintenance/under-construction/under-construction2')));
const MaintenanceComingSoon = Loadable(lazyRetry(() => import('pages/maintenance/coming-soon/coming-soon')));
const MaintenanceComingSoon2 = Loadable(lazyRetry(() => import('pages/maintenance/coming-soon/coming-soon2')));

const Home = Loadable(lazyRetry(() => import('pages/feature/gest/home')));
const AllEpisodes = Loadable(lazyRetry(() => import('pages/feature/gest/episodes')));
const ViewEpisodeGuest = Loadable(lazyRetry(() => import('pages/feature/gest/episodes/ViewEpisode')));
const AllApplications = Loadable(lazyRetry(() => import('pages/feature/gest/applications')));
const ViewApplication = Loadable(lazyRetry(() => import('pages/feature/gest/applications/ViewApplication')));
const Support = Loadable(lazyRetry(() => import('pages/feature/gest/support')));
const Contact = Loadable(lazyRetry(() => import('pages/feature/gest/contact')));
const WorksheetsGuest = Loadable(lazyRetry(() => import('pages/feature/gest/worksheets')));
const Dashboard = Loadable(lazyRetry(() => import('pages/feature/control-panel/dashboard')));

// render - episodes
const EpisodesList = Loadable(lazyRetry(() => import('pages/feature/control-panel/episodes')));
const CreateEpisode = Loadable(lazyRetry(() => import('pages/feature/control-panel/episodes/create')));
const EditEpisode = Loadable(lazyRetry(() => import('pages/feature/control-panel/episodes/edit')));
const ViewEpisode = Loadable(lazyRetry(() => import('pages/feature/control-panel/episodes/view')));
const FAQ = Loadable(lazyRetry(() => import('pages/feature/gest/FAQ')));
const Terms = Loadable(lazyRetry(() => import('pages/feature/gest/terms')));
const Privacy = Loadable(lazyRetry(() => import('pages/feature/gest/privacy')));
// render - episode categories
const EpisodeCategories = Loadable(lazyRetry(() => import('pages/feature/control-panel/episode-categories')));

// render - worksheets
const Worksheets = Loadable(lazyRetry(() => import('pages/feature/control-panel/worksheets')));

// render - applications
const ApplicationsAdmin = Loadable(lazyRetry(() => import('pages/feature/control-panel/applications')));

// render - contact messages
const ContactMessagesAdmin = Loadable(lazyRetry(() => import('pages/feature/control-panel/contact-messages')));
// render - categories
const CategoriesAdmin = Loadable(lazyRetry(() => import('pages/feature/control-panel/categories')));

// render - users
const UsersAdmin = Loadable(lazyRetry(() => import('pages/feature/control-panel/users')));
// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  errorElement: <RouteErrorBoundary />,
  children: [
    {
      path: '/',
      element: <SimpleLayout layout={SimpleLayoutType.SIMPLE} />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/episodes',
          element: <AllEpisodes />
        },
        {
          path: '/episodes/:id',
          element: <ViewEpisodeGuest />
        },
        {
          path: '/applications',
          element: <AllApplications />
        },
        {
          path: '/applications/:id',
          element: <ViewApplication />
        },
        {
          path: '/support',
          element: <Support />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/worksheets',
          element: <WorksheetsGuest />
        },
        {
          path: '/faq',
          element: <FAQ />
        },
        {
          path: '/terms',
          element: <Terms />
        },
        {
          path: '/privacy',
          element: <Privacy />
        }

      ]
    },
    {
      path: '/',
      element: (
        <AuthGuard requiredRole="Admin">
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'dashboard/episodes',
          element: <EpisodesList />
        },
        {
          path: 'dashboard/episodes/create',
          element: <CreateEpisode />
        },
        {
          path: 'dashboard/episodes/:id',
          element: <ViewEpisode />
        },
        {
          path: 'dashboard/episodes/:id/edit',
          element: <EditEpisode />
        },
        {
          path: 'dashboard/episode-categories',
          element: <EpisodeCategories />
        },
        {
          path: 'dashboard/worksheets',
          element: <Worksheets />
        },
        {
          path: 'dashboard/applications',
          element: <ApplicationsAdmin />
        },
        {
          path: 'dashboard/contact-messages',
          element: <ContactMessagesAdmin />
        },
        {
          path: 'dashboard/categories',
          element: <CategoriesAdmin />
        },
        {
          path: 'dashboard/users',
          element: <UsersAdmin />
        }
      ]
    },

    {
      path: '/maintenance',
      element: <PagesLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'under-construction2',
          element: <MaintenanceUnderConstruction2 />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        },
        {
          path: 'coming-soon-2',
          element: <MaintenanceComingSoon2 />
        }
      ]
    },
    { path: '*', element: <MaintenanceError /> }
  ]
};

export default MainRoutes;
