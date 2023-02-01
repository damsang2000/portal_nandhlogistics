import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TableASN from '../../../Tables/AntdTable/components/TableEditAntd';
import DragAndDropTable from '../../../Tables/DnDTable/index';
import EditableTable from '../../../Tables/EditableTable/index';
import ResizableTable from '../../../Tables/ResizableTable';
import ApiTable from '../../../Tables/ApiTable';
import TableProduct from '../../../Tables/TableProduct/components/TableProduct';
import TableDO from '../../../Tables/TableDO/TableDO';
import ASNDetailTable from '../../../Tables/ASNDetailTable/ASNDetailTable';
import DODetailTable from '../../../Tables/DODetail/DODetail';
import RegulatoryHistoryTable from '../../../Tables/RegulatoryhistoryTable/RegulatoryHistoryTable';
import SystemImportTable from '../../../Tables/SystemImportTable/SystemImportTable';
import SystemExportTable from '../../../Tables/SystemExportTable/SystemExportTable';
import ImportExportToday from '../../../Tables/ImportExportToday';
import AgingReport from '../../../Tables/AgingReport/AgingReport';
import CurrentInventory from '../../../Tables/CurrentInventory/CurrentInventory';
import SLNTable from '../../../Tables/SLNTable/SLNTable';
import SLXTable from '../../../Tables/SLXTable/SLXTable';
import TableManageVoucher from '../../../Tables/TableDO/TableManageVoucher';
import TikiOrder from '../../../Tables/Tiki';
import ManageASN from '../../../Tables/AntdTable/components/ManageASN';
import TableInventory from '../../../Tables/inventory/TableInventory';
import CurrentInventorySell from '../../../Tables/CurrentInventory/CurrentInventorySell';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Switch>
    <Route
      path="/nh/data_table"
      component={TableProduct}
    />
    <Route
      path="/nh/dnd_table"
      component={DragAndDropTable}
    />
    <Route
      path="/nh/editable_table"
      component={EditableTable}
    />
    <Route
      path="/nh/manage_asn"
      component={ManageASN}
    />
    <Route
      path="/nh/resizable_table"
      component={ResizableTable}
    />
    <Route
      path="/nh/do"
      component={TableDO}
    />
    <Route
      path="/nh/mana_inventory"
      component={TableInventory}
    />
    <Route
      path="/nh/manage_do"
      component={TableManageVoucher}
    />
    <Route
      path="/nh/api_table"
      component={ApiTable}
    />
    <Route
      path="/nh/asn"
      component={TableASN}
    />
    <Route
      path="/nh/asndetail"
      component={ASNDetailTable}
    />
    <Route
      path="/nh/dodetail"
      component={DODetailTable}
    />
    <Route
      path="/nh/regulatoryhistory"
      component={RegulatoryHistoryTable}
    />
    <Route
      path="/nh/systemasn"
      component={SystemImportTable}
    />
    <Route
      path="/nh/systemdo"
      component={SystemExportTable}
    />
    <Route
      path="/nh/importexport"
      component={ImportExportToday}
    />
    <Route
      path="/nh/agingreport"
      component={AgingReport}
    />
    <Route
      path="/nh/currentinventory"
      component={CurrentInventory}
    />
    <Route
      path="/nh/currentinventorysell"
      component={CurrentInventorySell}
    />
    <Route
      path="/nh/sln"
      component={SLNTable}
    />
    <Route
      path="/nh/slx"
      component={SLXTable}
    />
    <Route
      path="/nh/config_tiki"
      component={TikiOrder}
    />
  </Switch>
);
