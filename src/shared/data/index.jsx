/* eslint-disable camelcase */
/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */

export const dataPostInsestASN = (
  token,
  ASN_No,
  Owner_Code,
  Warehouse_Code,
  Type_ID,
  Supplier_Code,
  Ship_To_Code,
  Truck_No,
  Driver,
  Note,
  Ref_No,
  so_Alt_1,
  listitem
) => {
  const dataItem = listitem.map((item) => ({
    Item_Code: item.ma_San_Pham,
    Qty: item.kien,
    Ctn: item.sl,
    Batch_No: item.sobatch || null,
    Manufature_Date: item.ngay_sx || null,
    Expired_Date: item.ngay_hh || null,
    GW: item.gw || null,
    NW: item.nw || null,
    CBM: item.cbm || null,
  }));
  return {
    Auth: {
      Token: token,
      Type_ID: 310,
      Prototype_ID: 2,
      Giao_Thuc_ID: 0,
      Device_ID: '',
    },
    Data: {
      ASN_No: ASN_No || null,
      Owner_Code,
      Warehouse_Code,
      Type_ID,
      Supplier_Code: Supplier_Code || null,
      Ship_To_Code: Ship_To_Code || null,
      Truck_No: Truck_No || null,
      Driver: Driver || null,
      Note: Note || null,
      Ref_No: Ref_No || null,
      so_Alt_1: so_Alt_1 || null,
      Transaction_Detail: dataItem,
    },
  };
};

export const dataPostInsestDO = (
  token,
  Do_No,
  Owner_Code,
  Warehouse_Code,
  Type_ID,
  Supplier_Code,
  Ship_To_Code,
  listitem
) => {
  const dataItem = listitem.map((item) => ({
    Item_Code: item.ma_San_Pham,
    Qty: item.kien,
    Ctn: item.sl,
  }));
  return {
    Auth: {
      Token: token,
      Type_ID: 410,
      Prototype_ID: 2,
      Giao_Thuc_ID: 0,
      Device_ID: '',
    },
    Data: {
      ASN_No: Do_No || null,
      Owner_Code,
      Warehouse_Code,
      Type_ID,
      Supplier_Code: Supplier_Code || null,
      Ship_To_Code: Ship_To_Code || null,
      Transaction_Detail: dataItem,
    },
  };
};
