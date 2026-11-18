import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { delay, finalize } from "rxjs";
import { SpinnerService } from "../../../shared/services/spinner/spinner.service";

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  const loadingService = inject(SpinnerService);

  // Excluir recursos que no necesitan mostrar el spinner
  const excludedUrls = [
    '/assets/'
  ];

  const shouldExclude = excludedUrls.some(url =>
    req.url.includes(url)
  );

  if (shouldExclude) {
    return next(req);
  }

  loadingService.show();

  return next(req).pipe(
    delay(1000),
    finalize(() => {
      loadingService.hide();
    })
  );
};