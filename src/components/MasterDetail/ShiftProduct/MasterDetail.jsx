import React, { useEffect, useState } from 'react';
import { Column, DataGrid, MasterDetail, Paging, Summary, TotalItem, GroupPanel, SearchPanel, Pager } from 'devextreme-react/data-grid';

const App = ({ product, isUpdate }) => {
  const [orderHistoryStore, setOrderHistoryStore] = useState(null);

  const fetchData = async () => {
    setOrderHistoryStore(product);
  };
  useEffect(() => {
    fetchData();
  }, [isUpdate]);

  return (
    <DataGrid
      dataSource={orderHistoryStore}
      remoteOperations={false}
      showBorders={true}
      allowColumnReordering={true}
      columnHidingEnabled={true}
      id="gridContainer"
    >
      <Pager allowedPageSizes={[10, 20, 50]} showPageSizeSelector={true} showNavigationButtons={true} />
      <GroupPanel visible={true} emptyPanelText="İstediğiniz alana göre gruplamak için sütun başlığını buraya sürükleyiniz." />
      <SearchPanel visible={true} width={310} />
      <Paging defaultPageSize={10} />

      <Column dataField="MakinaAdi" caption="Makina Adı" alignment="center" />
      <Column dataField="ReceteAdi" caption="Reçete Adı" alignment="center" />
      <Column dataField="LotAdi" caption="Lot Adı" alignment="center" />
      <Column dataField="Tartim" caption="Tartim" alignment="center" />
      <Column dataField="HedefKapiNo" caption="Hedef Kapı No" alignment="center" />
      <Column dataField="Tarih" caption="Tarih" dataType="date" alignment="center" format="dd.MM.yyyy HH.mm" />
      <Summary>
        <TotalItem showInColumn="ReceteAdi" column="ReceteAdi" summaryType="count" />
        <TotalItem showInColumn="Tartim" column="Tartim" summaryType="sum" valueFormat="fixedpoint" />
      </Summary>
    </DataGrid>
  );
};

export default App;
