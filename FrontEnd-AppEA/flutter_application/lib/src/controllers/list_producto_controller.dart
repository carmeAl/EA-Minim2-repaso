import 'package:flutter/widgets.dart' show ChangeNotifier;
import 'package:flutter_application/infrastructure/models/asignacion.dart';
import 'package:flutter_application/infrastructure/models/grupo_populate.dart';
import 'package:flutter_application/utils/constants.dart';
import 'package:get/get.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

import '../../infrastructure/models/producto.dart';
import '../../infrastructure/models/user.dart';
import '../../repositories/grupo_repository.dart';
import '../../repositories/grupo_repository_impl.dart';

class ListProductoController extends ChangeNotifier {
  GrupoPopulate _grupoPopulateUpdate = Constants.grupoPopulate;
  GrupoPopulate get grupoPopulate => _grupoPopulateUpdate;
  final GrupoRespository _grupoRepository = GrupoRepositoryImpl();
  //onTap Mapa
  void updateGrupoPopulate(String idGrupo) async {
    _grupoPopulateUpdate = await _grupoRepository.getPopulateGrupo(idGrupo);
    notifyListeners();
  }

//Control errores
  bool _showErrorMessage = false;
  bool get showErrorMessage => _showErrorMessage;

  bool showErrorMessageName = false;
  bool showErrorMessageCantidad = false;
  bool ShowErrorMessagePrice = false;

  void updateShowErrorMessage(bool estado) {
    _showErrorMessage = estado;
    notifyListeners();
  }

  void updateShowErrorMessageName(bool estado) {
    showErrorMessageName = estado;
    notifyListeners();
  }

  void updateShowErrorMessageCantidad(bool estado) {
    showErrorMessageCantidad = estado;
    notifyListeners();
  }

  void updateShowErrorMessagePrice(bool estado) {
    ShowErrorMessagePrice = estado;
    notifyListeners();
  }

  //Montar tabla asignaces productos de todos los usuarios

  List<String> headers = Constants.headers;
  List<List<dynamic>> data = Constants.data;
  void createDataTableAsignaciones() {
    Constants.headers.add("");
    for (User user in Constants.grupoPopulate.users) {
      Constants.headers.add(user.name);
    }
    for (Producto producto in Constants.ticket.productos) {
      List<dynamic> cantidades = [];
      cantidades.add(producto.name);
      for (User user in Constants.grupoPopulate.users) {
        cantidades.add(producto.asignaciones
            .firstWhere(
              (asignacion) => asignacion.usuario == user.id,
              orElse: () => Asignacion(
                  id: "id",
                  usuario: "usuario",
                  cantidad: 0,
                  createdAt: DateTime.parse("2023-05-09T06:54:07.810+00:00"),
                  updatedAt: DateTime.parse("2023-05-09T06:54:07.810+00:00")),
            )
            .cantidad);
      }
      Constants.data.add(cantidades);
    }
  }
}
