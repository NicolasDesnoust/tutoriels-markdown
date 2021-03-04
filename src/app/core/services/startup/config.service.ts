import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import deepmerge from 'deepmerge';
import { Observable } from 'rxjs';
import { tap, mapTo } from 'rxjs/operators';

import { Configuration, LoggerLevel } from '../../model/configuration';
import { defaultConfiguration } from '../../data/default-config';
import { BaseStartupService } from './base-startup.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService extends BaseStartupService {
  private readonly _configUrl = 'assets/config/config.json';
  private _configuration: Configuration = null;

  constructor(private http: HttpClient) {
    super();
  }

  get configuration() {
    return this._configuration;
  }

  // TODO: valider la configuration
  protected load(): Observable<void> {
    return this.http.get<Configuration>(this._configUrl).pipe(
      tap(
        (configuration: Configuration) =>
          (this._configuration = this.deepMergeConfig(
            defaultConfiguration,
            configuration
          ))
      ),
      mapTo(undefined)
    );
  }

  /**
   * Fusionne la configuration par défaut de l'application
   * avec celle chargée lors du runtime.
   */
  private deepMergeConfig(
    defaultConfig: Configuration,
    configuration: any
  ): Configuration {
    const loggingLevel: string | LoggerLevel = configuration.logging.level;

    if (typeof loggingLevel === 'string') {
      configuration.logging.level = LoggerLevel[loggingLevel];
    }

    return deepmerge(defaultConfig, configuration);
  }
}
