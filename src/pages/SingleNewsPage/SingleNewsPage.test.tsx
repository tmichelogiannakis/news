import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { MockedProvider as MockedApolloProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import theme from '../../theme';
import SingleNewsPage from './SingleNewsPage';
import {
  DeleteDocument,
  DislikeDocument,
  FetchSingleNewsDocument,
  LikeDocument
} from '../../graphql/generated/hooks';

const uuid = '78a04b09-a128-4764-b203-b61522f6b6d2';
const originalConfirm = window.confirm;
let fetchSingleNewsQueryCalled = false;
let fetchNullSingleNewsQueryCalled = false;
let likeMutationCalled = false;
let dislikeMutationCalled = false;
let deleteMutationCalled = false;
const fetchSingleNewsQuery = {
  request: {
    query: FetchSingleNewsDocument,
    variables: {
      uuid
    }
  },
  result: () => {
    fetchSingleNewsQueryCalled = true;
    return {
      data: {
        singleNews: {
          uuid,
          title: 'En tortor nunc nisi mattis pharetra, au a ex consectetur.',
          date: 'Mon Nov 11 2019 05:33:19 GMT+0200 (Eastern European Standard Time)',
          author: 'Lloyd Bradbury',
          likes: 2,
          text: 'Risus vitae au sem pharetra lectus, consectetur adipiscing vulputate ante dignissim. Aenean magna blandit ali ex justo nibh nulla. Turpis aliquam lum aliquet lum, sapien vitae condimentum maecenas velit blandit vestibulum nam gravida au, natoque elit ex mollis cras. Sem cras maximus it eu adipiscing. Et lum proin facilisis tempor, dignissim justo viverra purus etiam ornare felis nam vulputate. Lum tem porttitor hendrerit, adipiscing ex ligula vulputate.',
          __typename: 'News'
        }
      }
    };
  }
};
const fetchNullSingleNewsQuery = {
  request: {
    query: FetchSingleNewsDocument,
    variables: {
      uuid
    }
  },
  result: () => {
    fetchNullSingleNewsQueryCalled = true;
    return {
      data: {
        singleNews: null
      }
    };
  }
};
const likeMutation = {
  request: {
    query: LikeDocument,
    variables: {
      uuid
    }
  },
  result: () => {
    likeMutationCalled = true;
    return {
      data: { like: { likes: 3 } }
    };
  }
};
const dislikeMutation = {
  request: {
    query: DislikeDocument,
    variables: {
      uuid
    }
  },
  result: () => {
    dislikeMutationCalled = true;
    return {
      data: { dislike: { likes: 2 } }
    };
  }
};
const deleteMutation = {
  request: {
    query: DeleteDocument,
    variables: {
      uuid
    }
  },
  result: () => {
    deleteMutationCalled = true;
    return {
      data: {
        delete: []
      }
    };
  }
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    newsId: uuid
  }),
  useLocation: () => ({ state: null }),
  useNavigate: () => mockNavigate
}));

// click ok on confirm window
beforeAll(() => {
  window.confirm = jest.fn(() => true);
});
afterAll(() => (window.confirm = originalConfirm));

test('renders without crashing', async () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <MockedApolloProvider mocks={[fetchSingleNewsQuery]}>
          <SingleNewsPage />
        </MockedApolloProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
  await waitFor(() => {
    expect(fetchSingleNewsQueryCalled).toBe(true);
    expect(screen.getByRole('heading')).toHaveTextContent(
      'En tortor nunc nisi mattis pharetra, au a ex consectetur.'
    );
  });
});

test('should call like and dislike mutations', async () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <MockedApolloProvider
          mocks={[fetchSingleNewsQuery, likeMutation, dislikeMutation]}
        >
          <SingleNewsPage />
        </MockedApolloProvider>
      </MemoryRouter>
    </ThemeProvider>
  );

  await waitFor(() => {
    expect(fetchSingleNewsQueryCalled).toBe(true);
  });

  // click Like
  fireEvent.click(screen.getByRole('button', { name: 'Like' }));
  await waitFor(() => {
    expect(likeMutationCalled).toBe(true);
  });

  // click Dislike
  fireEvent.click(screen.getByRole('button', { name: 'Dislike' }));
  await waitFor(() => {
    expect(dislikeMutationCalled).toBe(true);
  });
});

test('return to home page on 404 SingleNews not Found', async () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <MockedApolloProvider mocks={[fetchNullSingleNewsQuery]}>
          <SingleNewsPage />
        </MockedApolloProvider>
      </MemoryRouter>
    </ThemeProvider>
  );

  await waitFor(() => {
    expect(fetchNullSingleNewsQueryCalled).toBe(true);
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});

test('should call delete mutation', async () => {
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <MockedApolloProvider mocks={[fetchSingleNewsQuery, deleteMutation]}>
          <SingleNewsPage />
        </MockedApolloProvider>
      </MemoryRouter>
    </ThemeProvider>
  );

  await waitFor(() => {
    expect(fetchSingleNewsQueryCalled).toBe(true);
  });

  // click Delete
  fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

  await waitFor(() => {
    // click Ok
    expect(deleteMutationCalled).toBe(true);
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
