(() => {

  const mainLayout = createMainLayout();

  const serverURL = 'https://jsonplaceholder.typicode.com/posts';
  let serverArr = [];

  function createMainLayout() {
    const main = document.createElement('main');
    const mainContainer = document.createElement('div');
    const mainSearchWrap = document.createElement('div');
    const mainSearchInput = document.createElement('input');
    const mainTableWrap = document.createElement('div');
    const mainTable = document.createElement('table');
    const mainThead = document.createElement('thead');
    const mainTheadTr = document.createElement('tr');
    const userId = document.createElement('th');
    const id = document.createElement('th');
    const title = document.createElement('th');
    const body = document.createElement('th');
    const mainTbody = document.createElement('tbody');

    main.classList.add('main');
    mainContainer.classList.add('main__container');
    mainSearchWrap.classList.add('main__search-wrap');
    mainTableWrap.classList.add('main__table-wrap');
    mainTable.classList.add('main__table', 'table');
    mainThead.classList.add('table__head', 'thead');
    mainTheadTr.classList.add('thead__tr');
    mainTbody.classList.add('table__body', 'tbody');

    userId.textContent = 'userId';
    id.textContent = 'id';
    title.textContent = 'title';
    body.textContent = 'body';

    mainSearchInput.addEventListener('input', () => {
      if (mainSearchInput.value && mainSearchInput.value.length > 2) {
        renderTableData(searchTableData(serverArr, mainSearchInput.value));
      } else {
        renderTableData(serverArr);
      }
    });

    userId.style.cursor = 'pointer';
    id.style.cursor = 'pointer';
    title.style.cursor = 'pointer';
    body.style.cursor = 'pointer';

    userId.addEventListener('click', () => {
      sortTableData(serverArr, userId, 'userId');
    });
    id.addEventListener('click', () => {
      sortTableData(serverArr, id, 'id');
    });
    title.addEventListener('click', () => {
      sortTableData(serverArr, title, 'title');
    });
    body.addEventListener('click', () => {
      sortTableData(serverArr, body, 'body');
    });

    mainSearchWrap.append(mainSearchInput);
    mainTheadTr.append(userId, id, title, body);
    mainThead.append(mainTheadTr);
    mainTable.append(mainThead, mainTbody);
    mainTableWrap.append(mainTable);
    mainContainer.append(mainSearchWrap, mainTableWrap);
    main.append(mainContainer);

    return {
      main,
      mainContainer,
      mainThead,
      mainTbody,
    };
  }

  function createTbodyRow() {
    const tbodyTr = document.createElement('tr');
    const tdUserId = document.createElement('td');
    const tdId = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdBody = document.createElement('td');

    tbodyTr.append(tdUserId, tdId, tdTitle, tdBody);

    return {
      tbodyTr,
      tdUserId,
      tdId,
      tdTitle,
      tdBody,
    };
  }

  async function getServerData() {
    try {
      let response = await fetch(serverURL);
      let data = await response.json();
      return data;
    } catch (err) {
      mainLayout.mainContainer.textContent = 'Что-то пошло не так :('
    }
  }

  function renderTableData(arr) {
    mainLayout.mainTbody.innerHTML = '';

    for (obj of arr) {
      const tableRowElem = createTbodyRow();

      const userId = `${obj.userId}`;
      const id = `${obj.id}`;
      const title = `${obj.title}`;
      const body = `${obj.body}`;

      tableRowElem.tdUserId.textContent = userId;
      tableRowElem.tdId.textContent = id;
      tableRowElem.tdTitle.textContent = title;
      tableRowElem.tdBody.textContent = body;

      mainLayout.mainTbody.append(tableRowElem.tbodyTr);
    }
  }

  function searchTableData(arr, value) {
    let arrCopy = [...arr];

    let searched = {
      userId: arrCopy.filter(obj => String(obj.userId).includes(value)),
      id: arrCopy.filter(obj => String(obj.id).includes(value)),
      title: arrCopy.filter(obj => String(obj.title).includes(value)),
      body: arrCopy.filter(obj => String(obj.body).includes(value)),
    };

    let result = [...searched.userId, ...searched.id, ...searched.title, ...searched.body];
    return result.filter((a, b) => result.indexOf(a) === b);
  }

  function sortTableData(arr, thead, prop) {
    let arrCopy = [...arr];

    if (thead.classList.contains('sort-ab')) {
      thead.classList.remove('sort-ab');
      arrCopy = arrCopy.sort(function (a, b) {
        if (a[prop] > b[prop]) return -1;
      });
    } else {
      thead.classList.add('sort-ab');
      arrCopy = arrCopy.sort(function (a, b) {
        if (a[prop] < b[prop]) return -1;
      });
    }
    renderTableData(arrCopy);
  };

  async function createPage() {
    document.body.append(mainLayout.main);

    serverArr = await getServerData();
    renderTableData(serverArr);
  }
  createPage();

})();