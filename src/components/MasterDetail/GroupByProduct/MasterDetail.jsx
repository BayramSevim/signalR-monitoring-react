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

      <Column dataField="MakinaAdi" caption="Makina Adı" alignment="center" width={120} />
      <Column dataField="ReceteAdi" caption="Reçete Adı" alignment="center" width={200} />
      <Column dataField="HatAdi" caption="Hat Adı" alignment="center" width={120} />
      <Column dataField="LotAdi" caption="Lot Adı" alignment="center" width={120} />
      <Column dataField="Tartim" caption="Tartim (gr)" alignment="center" width={120} />
      <Column dataField="AltLimit" caption="Alt Limit" alignment="center" width={120} />
      <Column dataField="UstLimit" caption="Üst Limit" alignment="center" width={120} />
      <Column dataField="Metod" caption="Metod" alignment="center" width={120} />
      <Column dataField="HedefKapiNo" caption="Hedef Kapı No" alignment="center" width={120} />
      <Column dataField="HedefGrupNo" caption="Hedef Grup No" alignment="center" width={120} />
      <Column dataField="Tarih" caption="Tarih" dataType="date" alignment="center" format="dd.MM.yyyy HH.mm" width={120} />
      <Summary>
        <TotalItem showInColumn="code" summaryType="count" />
        <TotalItem showInColumn="sumTarget" column="sumTarget" summaryType="sum" valueFormat="fixedpoint" />
        <TotalItem showInColumn="sumActual" column="sumActual" summaryType="sum" valueFormat="fixedpoint" />
        <TotalItem showInColumn="diff" column="diff" summaryType="sum" valueFormat="fixedpoint" />
      </Summary>
    </DataGrid>
  );
};

export default App;
