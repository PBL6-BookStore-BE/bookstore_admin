import styled from 'styled-components'

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    background-color: var(--backgroundColor);
  }
  .dashboard-page {
    background-color: var(--white);
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 2rem;
    margin-top: 2em;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`
export default Wrapper
